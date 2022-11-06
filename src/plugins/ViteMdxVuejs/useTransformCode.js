// 表示原来的字符串
let str = ""
// 构建后 最新的字符串
let newString = ""
// 表示筛选的图片个数
let searchImgNum = 1
// 表示基础配置
let _baseOptions = {}
// 表示有哪些字符串需要匹配
const matchTags = Array.from({length: 6})
  .fill("h")
  .map((item, index) => `<${item}${index + 1}>`)
// 最后的导航列表
const navList = []
// 表示生成主键
const genKey = () => `${(Math.random() * 10000) | 0}${+new Date()}`

// 表示最短匹配
const minimumMatch = () => {
  const target = str
  // 分别用h1~6去匹配 获取一个最短的值
  const result = matchTags
    .map((label) => target.indexOf(label))
    .filter((item) => item !== -1)
  if (result.length === 0) return {location: -1}

  const minLoc = Math.min(...result)
  const sliceContent = target.slice(minLoc + 1, minLoc + 3)
  return {
    left: minLoc + 1,
    right: minLoc + 3,
    location: minLoc,
    label: sliceContent
  }
}

// 表示第一个标签序号
let firstLabelNum = 0
/**
 * @author lihh
 * @description 用来生成导航
 * @param pos 位置信息
 */
const genNav = (pos) => {
  const {label, right} = pos
  // 获取结束标签位置
  const endIndex = str.indexOf(`</${label}>`)
  let content = str.slice(right + 1, endIndex).replace(/`|{|}/g, "")

  if (navList.length === 0) firstLabelNum = +label.slice(1)
  const nav = {
    label,
    content,
    id: genKey(),
    space: +label.slice(1) - firstLabelNum
  }
  navList.push(nav)
  return nav.id
}

/**
 * @author lihh
 * @description 表示字符串拼接
 * @param pos 当前位置信息
 */
const strSplicing = (pos) => {
  // 生成导航 返回主键
  const id = genNav(pos)
  const endLabel = `</${pos.label}>`
  const endIndex = str.indexOf(endLabel)

  // 首先剥离标签之前内容
  newString += str.slice(0, pos.left)
  newString += `${pos.label} data-id = "${id}"`
  newString += str.slice(pos.right, endIndex + endLabel.length)

  str = str.slice(endIndex + endLabel.length)
}

// 表示生成导航页面
const genNavPage = () => {
  const lis = navList.map(({space, id, content, label}) => {
    return `<li data-refer-id="${id}" data-refer-label="${label}"><span data-refer-id="${id}" data-refer-label="${label}" style = "margin-left: ${
      +space * 8
    }px;">${content}</span></li>`
  })
  return `<ul class='nav-wrap'><ElScrollbar>${lis.join("")}</ElScrollbar></ul>`
}

// 表示开始转换
const transformStart = (code) => {
  str = code

  while (str) {
    // 获取最小截取位置
    const pos = minimumMatch()
    // 判断是否结束
    if (pos.location === -1) {
      newString += str
      str = ""
      break
    }

    strSplicing(pos)
  }

  // 开始生成导航页面 & 拼接到原字符串中
  if (navList.length > 0) newString = splicingNavHandle()
  return newString
}

/**
 * @author lihh
 * @description 拼接导航的方法
 * @returns {`import { ElScrollbar } from "element-plus";${string}${string}<div class = "rightContent">${string}</div>${string}`}
 */
function splicingNavHandle() {
  const navPageHtml = genNavPage()
  const matchStartContent = `mdxType="MDXLayout">`
  const matchEndContent = `</MDXLayout>`
  const startIndex = newString.indexOf(matchStartContent)
  const endIndex = newString.indexOf(matchEndContent)

  // 将原来的字符串 分解为三部分
  const front = newString.slice(0, startIndex + matchStartContent.length + 1)
  const center = newString.slice(
    startIndex + matchStartContent.length,
    endIndex
  )
  const after = newString.slice(endIndex)

  const additionalStr = `import { ElScrollbar } from "element-plus";`
  // 开始拼接字符串
  newString = `${additionalStr}${front}${navPageHtml}<div class = "rightContent">${center}</div>${after}`
  return newString
}

/**
 * @author lihh
 * @description 对字符串进行ast解析
 * @param baseOptions 基础配置
 */
function useTransformCode(baseOptions = {}) {
  newString = ""
  navList.length = 0
  firstLabelNum = 0
  searchImgNum = 1
  _baseOptions = baseOptions

  return [transformStart]
}

export default useTransformCode
