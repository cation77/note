<script setup lang="ts">
import { ref } from 'vue';
import pLimit from 'p-limit';
import { useUpload } from '@/utils/upload';

const limit = pLimit(5);
const chunkSize = 20 * 1024 * 1024;

const file = ref();

const onChange = async (e: any) => {
  file.value = e.target.files[0];
};

const upload = async () => {
  if (!file.value) return [];
  const { hash, fileChunks } = await useUpload(file.value, chunkSize);
  console.log('upload file hash', hash, fileChunks);
  // 判断文件 hash 是否已在服务端存在
  const { shouldUpload, uploadedList }: any = await verifyFile(hash);
  if (shouldUpload) {
    // 已存在，秒传
    return;
  }
  await requestUpload(hash, fileChunks, uploadedList);
};

const verifyFile = (hash: string) => {
  return fetch(`http://localhost:3666/verify?hash=${hash}`);
};

const requestUpload = async (
  hash: string,
  fileChunks: Blob[],
  uploadedList: string[]
) => {
  const list = fileChunks.filter(
    // 过滤已上传的片段
    (_, index) => !uploadedList.includes(`${hash}-${index}`)
  );
  const requestList = list.map((chunk, index) => {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash);
    formData.append('chunkHash', `${hash}-${index}`);
    formData.append('filename', file.value.name);
    const url = 'http://localhost:3666';
    return limit(() => fetch(url, { method: 'post', body: formData }));
  });
  await Promise.all(requestList);
  await mergeFile(hash);
};

const mergeFile = async (hash: string) => {
  return fetch(`http://localhost:3666/merge?hash${hash}`);
};

const handleUpload = async () => {
  console.log('handleUpload', file.value.name);
  await upload();
};
</script>

<template>
  <input type="file" @change="onChange" />
  <button @click="handleUpload">上传</button>
</template>

<style scoped></style>
