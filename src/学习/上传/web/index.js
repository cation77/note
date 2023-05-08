import pLimit from 'p-limit';

// 并发控制
const limit = pLimit(5);

// 对于文件操作
// File 和 Blob 的任何操作都不会将文件内容写入到内存中，包括 slice、构造 ObjectURL 这些
// 只有 FileReader 才会将文件读取到内存中

const SIZE = 10 * 1024 * 1024

function createFileChunk(file, size = SIZE) {
  let cur = 0
  const fileChunks = []
  while (cur < file.size) {
    // file.slice 是 File 对象从 Blob 对象继承而来
    fileChunks.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunks
}

function uploadFile(fileChunks) {
  const requestList = fileChunks.map(file => {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("hash", hash);
    formData.append("filename", this.container.file.name);
    return limit(() => requestUpload({ url: "http://localhost:3000", data: formData }))
  })
  return requestList
}

async function uploadFileRes() {
  const list = uploadFile(fileChunks)
  const result = await Promise.all(list)
  console.log('uploadFileRes', result)
  await mergeFile()
}

async function mergeFile() {
  // 文件分片上传完成，合并文件
  await request({ url: "http://localhost:3000/merge", })
}

function calculateHash(fileChunks) {
  const worker = new Worker('/hash.js')
  worker.postMessage({ fileChunks })
  worker.onmessage = message => {
    const { percentage, hash } = message.data

  }
}