const printQueue = [];

export function addPrintJob(job) {
  printQueue.push(job);

  console.log("Print job added to queue:");
  console.log(job);
}

export function getPrintQueue() {
  return printQueue;
}

export function removePrintJob(jobId) {
  const index = printQueue.findIndex((job) => job.jobId === jobId);

  if (index !== -1) {
    printQueue.splice(index, 1);
  }
}