const catalogExample = `Feature: Browse the practice car catalog

Scenario: Filter the catalog and check a discounted price
  Given "The catalog is open"
    flow.open "/";
  When "Filter by hatchback"
    flow.select "Hatchback" from "#category";
    flow.click button "Filter cars";
  Then "Only hatchbacks are shown and Kite 001 is discounted"
    flow.expect text "10 cars";
    flow.expect text "Kite 001";
    flow.expect text "$10,800.00";`;

export default function ReleasePreview() {
  return (
    <section
      id="flowstride-2"
      aria-labelledby="preview-heading"
      className="scroll-mt-16 border-b border-gray-800 bg-[#0B0A0F] py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[2fr_3fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold text-violet-300">Flowstride 2.0 preview</p>
          <h2 id="preview-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
            Run your first tests against a local practice app
          </h2>
          <p className="leading-relaxed text-gray-300">
            In a fresh project with the 2.0 preview and Node.js 22.12 or newer,
            initialize the examples, then start the run. Flowstride launches the
            practice app on your computer and opens the live dashboard so you
            can watch the catalog and sign-in tests.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-black p-4 text-sm leading-6 text-violet-200">
            <code>{"npx flowstride init\nnpx flowstride run"}</code>
          </pre>
          <details className="text-sm text-gray-300">
            <summary className="w-fit cursor-pointer text-violet-300">Already have a Flowstride project?</summary>
            <p className="mt-3">With 2.0 installed, create a separate practice workspace and run the examples there.</p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-gray-800 bg-black p-4 leading-6">
              <code>{"npx flowstride init --practice\ncd .flowstride/practice\nnpx flowstride run"}</code>
            </pre>
          </details>
          <a
            href="https://github.com/heroamogs/flowstride/blob/8fec04c75e30554171b2ddb549e6f85830c0f7cc/examples/practice-app/README.md"
            className="inline-block font-medium text-violet-300 underline underline-offset-4 hover:text-white"
          >
            Read the 2.0 practice guide
          </a>
        </div>
        <figure className="min-w-0 overflow-hidden rounded-xl border border-gray-800 bg-black">
          <figcaption className="border-b border-gray-800 px-5 py-3 font-mono text-sm text-gray-400">
            browse-catalog.flow
          </figcaption>
          <pre tabIndex={0} aria-label="Catalog test source" className="overflow-x-auto p-5 text-sm leading-7 text-gray-200">
            <code>{catalogExample}</code>
          </pre>
        </figure>
      </div>
    </section>
  );
}
