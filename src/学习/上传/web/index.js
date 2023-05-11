import pLimit from 'p-limit';

// 参考[字节跳动面试官：请你实现一个大文件上传和断点续传](https://juejin.cn/post/6844904046436843527)

// 并发控制
const limit = pLimit(5);

// 对于文件操作
// File 和 Blob 的任何操作都不会将文件内容写入到内存中，包括 slice、构造 ObjectURL 这些
// 只有 FileReader 才会将文件读取到内存中

const SIZE = 10 * 1024 * 1024

const filename = 'filename'

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

async function uploadFile(fileChunks) {
  const hash = await calculateHash(fileChunks)
  const requestList = fileChunks.map(({ file }, index) => {
    const formData = new FormData();
    formData.append("chunk", file);
    formData.append("hash", hash);
    formData.append("chunkHash", `${hash}-${index}`);
    formData.append("filename", filename);
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
  return new Promise(resolve => {
    const worker = new Worker('/hash.js')
    worker.postMessage({ fileChunks })
    worker.onmessage = message => {
      const { percentage, hash } = message.data
      if (hash) {
        resolve(hash)
      }
    }
  })
}
