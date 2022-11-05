<script setup>
import logo from '../../assets/images/logo.png'
import { onMounted, ref } from 'vue'

// 表示博客名称
const name = ref('始于清风')
// 表示GitHub 地址
const url = ref('')

const skipGithub = () => {
  if (!url.value) return;

  window.open(url.value);
}

onMounted(() => {
  if (window._selfField && typeof window._selfField === 'object') {
    const { _selfField } = window
    if (_selfField.name) name.value = _selfField.name;
    url.value = _selfField.name;
  }
})
</script>

<template>
  <div class="header">
    <img :src="logo" alt="" />
    <span title="github" @click = "skipGithub">{{name}}</span>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 60px;
  background: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }

  span {
    font-size: 18px;
    color: #fff;
    margin-left: 20px;
    text-decoration: underline;
    font-style: italic;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>