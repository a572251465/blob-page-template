/**
 * @author lihh
 * @description 设置缓存
 */
import { reactive } from 'vue'

export const cacheStore = reactive({
  navValue: "",
  articleValue: "",
  mdValue: ''
})

export const settingStore = (type, value) => {
  const needFields = ["navValue", "articleValue", "mdValue"];
  if (!needFields.includes(type)) throw TypeError(`type must is ${needFields}, but type is ${type}`)
  cacheStore[type] = value

  localStorage.setItem(type, value)
}

const initStore = () => {
  const navValue = localStorage.getItem("navValue") || ""
  const articleValue = localStorage.getItem("articleValue") || ""
  const mdValue = localStorage.getItem('mdValue') || ''

  cacheStore.navValue = navValue
  cacheStore.articleValue = articleValue
  cacheStore.mdValue = mdValue
};

initStore()