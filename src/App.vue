<script setup>
import Header from './components/Header/index.vue'
import { ref } from 'vue'
import A1 from './components/mdx/A1.mdx'

// 表示一级分类list
const classifyList = ref([])
// 表示文章标题列表
const articleTitleList = ref([])

// 表示一级分类选中状态
const oneActive = ref(-1)
// 表示二级分类选中状态
const twoActive = ref(-1)

// --------------- 模拟数据 ---------------------
classifyList.value = [
  {
    label: 'Css',
    value: 0
  },
  {
    label: 'Java',
    value: 1
  },
  {
    label: 'JavaScript',
    value: 2
  },
  {
    label: 'Linux',
    value: 3
  },
  {
    label: 'React',
    value: 4
  },
  {
    label: 'TypeScript',
    value: 5
  }
]

articleTitleList.value = [
  {
    label: 'Java飞升之路之docker 数据卷',
    value: 0
  },
  {
    label: 'Java飞升之路之docker-compose安装',
    value: 1
  },
  {
    label: 'Java飞升之路之docker 数据卷',
    value: 2
  },
  {
    label: 'Java飞升之路之DockerFile',
    value: 3
  },
  {
    label: 'Java飞升之路之docker本质',
    value: 4
  },
  {
    label: 'Java飞升之路之docker介绍以及安装',
    value: 5
  },
  {
    label: 'Java飞升之路之docker相关的网络知识',
    value: 6
  },
  {
    label: 'Java飞升之路之docker中namespace',
    value: 7
  },
  {
    label: 'Java飞升之路之Mysq安装',
    value: 8
  }
]
</script>

<template>
  <div class="container">
    <Header />
    <div class="body">
      <ul class="part01">
        <li
          v-for="item of classifyList"
          :key="item.value"
          @click="oneActive = item.value"
          :class="oneActive === item.value ? 'oneActive' : ''"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="part02">
        <li
          v-for="item of articleTitleList"
          :key="item.value"
          @click="twoActive = item.value"
          :class="twoActive === item.value ? 'twoActive' : ''"
        >
          <span><em v-show="item.value === twoActive">☑</em></span>
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <div class="part03">
        <div class="markdown-body">
          <A1 />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.body {
  height: calc(100% - 60px);
  display: flex;

  .part01 {
    background: #1b1c1f;
    width: 150px;
    height: 100%;
    box-shadow: 3px 3px 3px black;

    li {
      &:first-of-type {
        margin-top: 30px;
      }

      height: 40px;
      line-height: 40px;
      color: #fff;
      font-weight: bold;
      font-style: italic;
      padding: 0 20px;
      cursor: pointer;
      text-align: left;
      text-decoration: underline;

      &:hover {
        background-image: linear-gradient(to right, red, yellow);
      }
    }

    .oneActive {
      background-image: linear-gradient(to right, red, yellow);
    }
  }

  .part02 {
    background: rgba(27, 28, 31, 0.5);
    width: 250px;
    color: #ffffff;
    height: 100%;

    li {
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 7px 3px;
      cursor: pointer;
      font-weight: bold;
      border-right: 4px solid transparent;
      font-size: 12px;

      & > span:nth-child(1) {
        display: inline-block;
        width: 20px;
        color: blue;
      }

      &:first-of-type {
        margin-top: 30px;
      }

      &:hover {
        border-right: 4px solid blue;
      }
    }

    .twoActive {
      border-right: 4px solid blue;
    }
  }
  .part03 {
    flex: 1;
    padding: 20px 40px;
  }
}
</style>
