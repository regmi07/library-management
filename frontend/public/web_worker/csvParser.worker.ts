function csvWorkerWrapper(papaparseScript) {
  // handle csv parsing in web worker
  self.addEventListener("message", (event) => {
    const csvString = event.data;
    console.log(event.data);

    // Load papaparse dynamically using Blob and importScripts
    const papaparseBlob = new Blob(
      [`importScripts('${new URL("papaparse.min.js", import.meta.url)}');`],
      { type: "application/javascript" }
    );
    const papaparseUrl = URL.createObjectURL(papaparseBlob);
    importScripts(papaparseUrl);

    papaparseScript.parse(csvString, {
      // only preview first 5 rows
      header: true,
      complete: (result) => {
        self.postMessage({ csvData: result.data });
      },
      error: (err) => {
        console.log(err);
        self.postMessage({ csvData: err });
      },
    });
    // self.postMessage({ csvData: "Hello world" });
  });
}

export default function createCsvWorker() {
  const blob = new Blob([`(${csvWorkerWrapper})(Papa)`], {
    type: "application/javascript",
  });
  return new Worker(URL.createObjectURL(blob));
}
