// 导入脚本
self.importScripts("/spark-md5.min.js");

// 生成文件 hash
self.onmessage = message => {
  const { file, chunkSize } = message
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new self.SparkMD5.ArrayBuffer()
  const reader = new FileReader()

  reader.onload = function (e) {
    spark.append(e.target.result)
    currentChunk++
    if (currentChunk < chunks) {
      loadNext()
    } else {
      const hash = spark.end()
      self.postMessage({ hash });
      // self.close();
    }
  }

  reader.onerror = function () { }

  const loadNext = () => {
    const start = currentChunk * chunkSize
    const end = start + chunkSize > file.size ? file.size : start + chunkSize
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const chunk = blobSlice.call(file, start, end);
    reader.readAsArrayBuffer(chunk)
  }

  loadNext()
}
