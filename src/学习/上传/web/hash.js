// /public/hash.js

// 导入脚本
self.importScripts("/spark-md5.min.js");

// 生成文件 hash
self.onmessage = message => {
  const { fileChunks } = message.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const calculate = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunks[index].file);
    reader.onload = event => {
      count++;
      spark.append(event.target.result);
      if (count === fileChunks.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close();
      } else {
        percentage += 100 / fileChunks.length;
        self.postMessage({
          percentage
        });
        // calculate recursively
        calculate(count);
      }
    };
  };
  calculate(0);
};