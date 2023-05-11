// 导入脚本
import SparkMD5 from 'spark-md5'

// 生成文件 hash
self.onmessage = (message) => {
  const { file, chunkSize } = message.data
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  let percentage = 0
  const fileChunks = []
  const spark = new SparkMD5.ArrayBuffer()
  const reader = new FileReader()

  reader.onload = function (e) {
    const chunk = e.target.result
    spark.append(chunk)
    currentChunk++
    if (currentChunk < chunks) {
      percentage += 100 / chunks
      self.postMessage({ percentage })
      loadNext()
    } else {
      const hash = spark.end()
      self.postMessage({ hash, fileChunks, percentage: 100 })
      // self.close();
    }
  }

  reader.onerror = function () {
    console.log('file read error')
  }

  const loadNext = () => {
    const start = currentChunk * chunkSize
    const end = start + chunkSize > file.size ? file.size : start + chunkSize
    const chunk = file.slice(start, end)
    fileChunks.push(chunk)
    reader.readAsArrayBuffer(chunk)
  }

  loadNext()
}
