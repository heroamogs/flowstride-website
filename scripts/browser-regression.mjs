import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { once } from 'node:events';
import { before, after, test } from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const docs = JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).name === 'docs';
const tools = process.env.FLOWSTRIDE_BROWSER_TOOLS;
assert(tools, 'Set FLOWSTRIDE_BROWSER_TOOLS to the isolated Playwright package directory.');
const { chromium, firefox, webkit } = createRequire(path.join(path.resolve(tools), 'package.json'))('playwright');
let origin, server, child, output = '';
let catalogServer, catalogOrigin, checkoutMode = 'off';

// Amounts in minor units. The GHS fixture also exercises fractional display.
const pricingMarkets = [
  { currency:'USD', country:null, label:'US Dollar', team:2_900, business:12_900 },
  { currency:'NGN', country:'NG', label:'Nigerian Naira', team:4_205_000, business:18_705_000 },
  { currency:'GHS', country:'GH', label:'Ghanaian Cedi', team:43_525, business:193_575 },
  { currency:'KES', country:'KE', label:'Kenyan Shilling', team:377_000, business:1_677_000 },
];
const paidPlans = ['Team', 'Business'];
const billingTerms = [
  { cycle:'monthly', button:'Monthly', unit:'month', multiplier:1 },
  { cycle:'annual', button:'Yearly', unit:'year', multiplier:10 },
];
const offers = pricingMarkets.flatMap(market => paidPlans.flatMap(name => {
  const plan = name.toLowerCase();
  return billingTerms.map(({cycle, multiplier}) => ({
    id:`${plan}-${cycle}`, currency:market.currency, amountMinor:market[plan] * multiplier,
  }));
}));

async function checkPaidCards(page, mode, market, term) {
  const format = new Intl.NumberFormat('en-US', {
    style:'currency', currency:market.currency, currencyDisplay:'narrowSymbol', minimumFractionDigits:0,
  });
  for (const name of paidPlans) {
    const plan = name.toLowerCase();
    const amountMinor = market[plan] * term.multiplier;
    const description = `${market.currency} ${name} ${term.cycle} (${mode})`;
    const card = page.getByRole('article', { name, exact:true });
    assert(await card.getByText(format.format(amountMinor / 100), { exact:true }).isVisible(), description);
    assert(await card.getByText(`/ ${term.unit}`, { exact:true }).isVisible(), description);
    if (mode === 'off') {
      assert(await card.getByText('Checkout paused', { exact:true }).isVisible(), description);
      assert.equal(await card.getByRole('link').count(), 0, description);
    } else {
      const label = mode === 'live' ? `Start ${name} Plan` : `Test ${name} checkout`;
      const link = card.getByRole('link', { name:label, exact:true });
      assert(await link.isVisible(), description);
      const checkout = new URL(await link.getAttribute('href'));
      assert.equal(checkout.origin + checkout.pathname, catalogOrigin + '/billing/checkout', description);
      assert.deepEqual(Object.fromEntries(checkout.searchParams), {
        plan, billing:term.cycle, currency:market.currency, price:String(amountMinor),
      }, description);
    }
  }
}

before(async () => {
  if (docs) {
    const dist = path.join(root, '.vitepress/dist');
    assert(fs.existsSync(dist), 'Build the documentation before browser regression.');
    const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' };
    server = createServer((req, res) => {
      try {
        const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '');
        const target = path.resolve(dist, relative);
        if (path.relative(dist, target).startsWith('..')) { res.writeHead(403); res.end(); return; }
        const file = [target, target + '.html', path.join(target, 'index.html')]
          .find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
        if (!file) { res.writeHead(404); res.end(); return; }
        res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
        res.end(fs.readFileSync(file));
      } catch { res.writeHead(400); res.end(); }
    });
    server.listen(0, '127.0.0.1'); await once(server, 'listening');
    origin = `http://127.0.0.1:${server.address().port}`;
  } else {
    catalogServer = createServer((request, response) => {
      if (request.url !== '/api/billing/catalog') return response.writeHead(404).end();
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({
        checkoutMode,
        testCheckout: checkoutMode === 'test',
        markets: pricingMarkets.map(({ currency, country, label }) => ({ currency, country, label })),
        offers,
      }));
    });
    catalogServer.listen(0, '127.0.0.1');
    await once(catalogServer, 'listening');
    catalogOrigin = `http://127.0.0.1:${catalogServer.address().port}`;
    const reserve = createServer(); reserve.listen(0, '127.0.0.1'); await once(reserve, 'listening');
    const port = reserve.address().port; await new Promise(resolve => reserve.close(resolve));
    origin = `http://127.0.0.1:${port}`;
    child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)],
      { cwd:root, env:{...process.env, NEXT_TELEMETRY_DISABLED:'1', FLOWSTRIDE_CLOUD_ORIGIN:catalogOrigin}, stdio:['ignore','pipe','pipe'] });
    child.stdout.on('data', data => output += data); child.stderr.on('data', data => output += data);
    let ready = false;
    for (let attempt = 0; attempt < 120 && !ready; attempt++) {
      assert(child.exitCode === null, `Website server exited: ${output}`);
      try { ready = (await fetch(origin, { signal:AbortSignal.timeout(1000) })).ok; } catch {}
      if (!ready) await new Promise(resolve => setTimeout(resolve, 250));
    }
    assert(ready, `Website server did not become ready: ${output}`);
  }
}, { timeout:45000 });

after(async () => {
  if (child && child.exitCode === null) { child.kill('SIGTERM'); await once(child, 'close'); }
  if (server) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
  if (catalogServer) { catalogServer.closeAllConnections(); await new Promise(resolve => catalogServer.close(resolve)); }
});

for (const [name, engine] of Object.entries({chromium, firefox, webkit})) {
  test(`${docs ? 'Documentation' : 'Website'} production regression in ${name}`, { timeout:90000 }, async () => {
    const browser = await engine.launch({ headless:true });
    try {
      const context = await browser.newContext({ viewport:{width:1440,height:1000} });
      // Browser requests stay local. Next.js uses the disposable catalog server above.
      await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
      const page = await context.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(() => { window.__copied = ''; Object.defineProperty(navigator, 'clipboard', {value:{writeText:async value => {window.__copied = value;}}}); });
      assert((await page.goto(origin)).ok());
      await page.locator('h1').first().waitFor();
      if (docs) {
        assert.match(await page.locator('h1').innerText(), /Test the journey/);
        await page.locator('.VPNavBarSearch button').click();
        await page.locator('#localsearch-input').fill('session');
        await page.locator('#localsearch-list a.result').first().waitFor();
        await page.locator('#localsearch-list a.result').first().click();
        await page.waitForURL(url => url.pathname !== '/');
        assert.match(await page.locator('main').innerText(), /session/i);
        for (const route of ['/guide/api-and-ui', '/guide/table-testing', '/guide/audio-to-text', '/manual-workspace/manual-testing', '/guide/native-browser-workflows']) {
          assert((await page.goto(origin + route)).ok());
          await page.locator('main h1').waitFor();
          assert((await page.locator('main').innerText()).length > 300);
        }
        await page.getByRole('switch').first().click();
        await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
      } else {
        assert.equal(await page.title(), 'Flowstride | Browser and API testing');
        const command = 'npm install --save-dev flowstride';
        assert(await page.getByText(command, {exact:true}).isVisible());
        await page.getByRole('button', {name:'Copy', exact:true}).click();
        await page.waitForFunction(expected => window.__copied === expected, command);
        const githubLinks = page.getByRole('link', {name:'GitHub', exact:true});
        assert(await githubLinks.count() > 0);
        for (const link of await githubLinks.all()) {
          assert.equal(await link.getAttribute('href'), 'https://github.com/heroamogs/flowstride');
        }
        await page.getByRole('link', {name:'Explore the 2.0 preview', exact:true}).click();
        await page.waitForURL(url => url.hash === '#flowstride-2');
        const preview = page.locator('#flowstride-2');
        assert(await preview.getByText('browse-catalog.flow', {exact:true}).isVisible());
        assert.match(await preview.innerText(), /npx flowstride init\s+npx flowstride run/);
        await preview.getByText('Already have a Flowstride project?', {exact:true}).click();
        assert.match(await preview.innerText(), /npx flowstride init --practice\s+cd \.flowstride\/practice\s+npx flowstride run/);
        assert.match(await preview.getByRole('link', {name:'Read the 2.0 practice guide'}).getAttribute('href'), /\/examples\/practice-app\/README\.md$/);
        // Image optimization still serves the existing local image after Next/sharp updates.
        const image = await context.request.get(origin + '/_next/image?url=%2Flogo.png&w=64&q=75');
        assert.equal(image.status(), 200); assert.match(image.headers()['content-type'], /^image\//);
        const denied = await context.request.get(origin + '/_next/image?url=http%3A%2F%2F127.0.0.1%3A1%2Fprivate&w=64&q=75');
        assert.equal(denied.status(), 400);
        assert((await page.goto(origin + '/pricing')).ok());
        assert(await page.getByRole('heading', {level:1, name:'Flowstride Pro pricing'}).isVisible());
        await page.getByRole('navigation').getByRole('link', {name:'Features', exact:true}).click();
        await page.waitForURL(url => url.pathname === '/' && url.hash === '#features');
        await page.locator('#features h2').waitFor();
        await page.goto(origin + '/pricing');
        await page.getByText('Personal', {exact:true}).waitFor();
        const team = page.getByRole('article', { name: 'Team', exact: true });
        const plannedAllowances = [
          ['Personal', '1,000 runs reported to Cloud', '200 FlowMail OTP requests'],
          ['Team', '20,000 runs reported to Cloud', '10,000 FlowMail OTP requests'],
          ['Business', '100,000 runs reported to Cloud', '50,000 FlowMail OTP requests'],
        ];
        for (const mode of ['off', 'test', 'live']) {
          checkoutMode = mode;
          assert((await page.reload()).ok());
          for (const market of pricingMarkets) {
            await page.getByLabel('Currency', { exact:true }).selectOption(market.currency);
            for (const term of billingTerms) {
              await page.getByRole('button', { name:term.button, exact:true }).click();
              await checkPaidCards(page, mode, market, term);
            }
            if (market.currency === 'NGN') {
              assert(await team.getByText('Save ₦84,100/year on annual plan', { exact: true }).isVisible());
            }
          }
          assert.equal(await page.getByText(/Test Mode pricing preview|Checkout uses Flutterwave test payments/i).count(), 0);
          for (const [plan, runs, otpRequests] of plannedAllowances) {
            const card = page.getByRole('article', { name: plan, exact: true });
            assert(await card.getByText('Planned allowances per 30 days', { exact: true }).isVisible());
            assert(await card.getByText(runs, { exact: true }).isVisible());
            assert(await card.getByText(otpRequests, { exact: true }).isVisible());
          }
          const enterprise = page.getByRole('article', { name: 'Enterprise', exact: true });
          assert.equal(await enterprise.getByText('Planned allowances per 30 days', { exact: true }).count(), 0);
        }
        assert.equal((await context.request.get(origin + '/not-a-real-route')).status(), 404);
      }
      await page.setViewportSize({width:390,height:844});
      assert((await page.goto(origin)).ok()); await page.locator('h1').first().waitFor();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Mobile layout overflows horizontally');
      if (!docs) {
        const navigation = page.getByRole('navigation');
        await navigation.getByRole('link', {name:'Pricing', exact:true}).click();
        await page.waitForURL(url => url.pathname === '/pricing');
        await navigation.getByRole('link', {name:'2.0 preview', exact:true}).click();
        await page.waitForURL(url => url.pathname === '/' && url.hash === '#flowstride-2');
        assert(await page.getByLabel('Catalog test source').isVisible());
      }
      const evidence = path.join(root, 'test-results'); fs.mkdirSync(evidence, {recursive:true});
      await page.screenshot({path:path.join(evidence, `${name}-mobile.png`), fullPage:true});
      assert.deepEqual(errors, [], 'Client rendering or hydration errors');
    } finally { await browser.close(); }
  });
}
