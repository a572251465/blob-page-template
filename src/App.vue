<script>
import Header from './components/Header/index.vue'
import { onMounted, ref, defineComponent } from 'vue'
import A1 from './components/mdx/A1.mdx'
import { cacheStore, settingStore } from './store/index.js'

export default defineComponent({
  // <!-- components-replace -->
  components: {
    A1,
    Header
  },
  setup() {
    // 表示一级分类list
    const classifyList = ref([])
    // 表示文章标题列表
    const articleTitleList = ref([])

    // 表示一级分类选中状态
    const oneActive = ref('')
    // 表示二级分类选中状态
    const twoActive = ref('')

    // 表示滚动条的ref
    const scrollbarRef = ref()

    // 表示导航点击事情
    const navClickHandle = (type, value) => {
      if (type === 'navValue') {
        oneActive.value = value
      } else {
        twoActive.value = value
      }

      settingStore(type, value)
    }

    // 表示缩略图点击
    const thumbnailHandle = () => {
      const target = event.target
      const { dataset = {} } = target
      // 判断指定的字段是否存在
      if (
        !Reflect.has(dataset, "referId") ||
        !Reflect.has(dataset, "referLabel")
      )
        return

      // 开始获取dom元素
      try {
        const { referId, referLabel } = dataset
        const dom = document.querySelector(
          `${referLabel}[data-id="${referId}"]`
        )
        scrollbarRef.value.setScrollTop(dom.offsetTop)
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      oneActive.value = cacheStore.navValue
      twoActive.value = cacheStore.articleValue
    })

    // --------------- 模拟数据 ---------------------
    classifyList.value = [
      {
        label: 'Css',
        value: '0'
      },
      {
        label: 'Java',
        value: '1'
      },
      {
        label: 'JavaScript',
        value: '2'
      },
      {
        label: 'Linux',
        value: '3'
      },
      {
        label: 'React',
        value: '4'
      },
      {
        label: 'TypeScript',
        value: '5'
      }
    ]

    articleTitleList.value = [
      {
        label: 'Java飞升之路之docker 数据卷',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之docker-compose安装',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之docker 数据卷',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之DockerFile',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之docker本质',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之docker介绍以及安装',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之docker相关的网络知识',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之docker中namespace',
        value: 'A1'
      },
      {
        label: 'Java飞升之路之Mysq安装',
        value: 'A1'
      }
    ]

    return {
      classifyList,
      articleTitleList,
      oneActive,
      twoActive,
      scrollbarRef,
      navClickHandle,
      A1,
      Header,
      thumbnailHandle
    }
  }
})
</script>

<template>
  <div class="container">
    <Header />
    <div class="body">
      <!--  一级导航部分    -->
      <ul class="part01">
        <li
          v-for="item of classifyList"
          :key="item.value"
          @click="navClickHandle('navValue', item.value)"
          :class="oneActive === item.value ? 'oneActive' : ''"
        >
          {{ item.label }}
        </li>
      </ul>

      <!--   二级导航部分   -->
      <ul class="part02">
        <el-scrollbar>
          <li
            v-for="(item, key) of articleTitleList"
            :key="key"
            @click="navClickHandle('articleValue', item.value)"
            :class="twoActive === item.value ? 'twoActive' : ''"
          >
            <span><em v-show="item.value === twoActive">☑</em></span>
            <span>{{ item.label }}</span>
          </li>
        </el-scrollbar>
      </ul>

      <!--   三级渲染markdown 部分   -->
      <div class="part03">
        <el-scrollbar ref="scrollbarRef">
          <div class="markdown-body" v-if="twoActive" @click="thumbnailHandle">
            <component :is="twoActive"></component>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
      text-decoration: underline;
    }
  }
  .part03 {
    width: calc(100% - 370px);
    position: relative;

    .markdown-body {
      padding: 0 40px;
    }

    .nav-wrap {
      position: absolute;
      right: 0;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
      background: #1b1c1f;
      top: 15%;
      height: 400px;
      padding: 20px 0;
      border-radius: 20px 0 0 20px;
      box-shadow: -10px 10px black;

      li {
        cursor: pointer;
        padding: 2px 10px;

        &:hover {
          background-image: linear-gradient(to right, red, yellow);
        }
      }
    }
  }
}
</style>
