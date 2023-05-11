import MyWorker from './worker.js?worker';

type IResult = {
  hash: string;
  fileChunks: Blob[];
};

export function useUpload(file: File, chunkSize: number): Promise<IResult> {
  return new Promise((resolve) => {
    const worker = new MyWorker();
    worker.postMessage({ file, chunkSize });
    worker.onmessage = (message) => {
      const { hash, fileChunks, percentage } = message.data;
      if (percentage === 100) {
        resolve({ hash, fileChunks });
      }
    };
  });
}
