import { createCompiler } from "@mdx-js/mdx"
import { createFilter } from "@rollup/pluginutils"
import useTransformCode from "./useTransformCode"

export default (options = {}) => {
  return {
    name: "vite-mdx",
    transform(code, id) {
      const { include = /\.md(x?)/, exclude } = options
      const filter = createFilter(include, exclude)

      if (filter(id)) {
        const compiler = createCompiler()
        const result = compiler.processSync(code)

        // 用来筛选文件名称
        const matchRes = /\/(\w+)\./gi.exec(id)
        const fileName = matchRes
          ? `${matchRes[1].charAt(0).toLowerCase()}${matchRes[1].slice(1)}`
          : ""
        const [transformStart] = useTransformCode(
          Object.assign({}, { imgBasePath: fileName, base: options.base || "/" })
        )

        return {
          code: transformStart(result.contents)
        }
      }
    }
  }
}
