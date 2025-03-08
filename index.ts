// 导入文件系统模块，用于读取目录内容
import fs from 'fs'
// 导入路径处理模块，用于处理文件路径
import path from 'path'
// 定义匹配.md文件的正则表达式
const md = /\.md$/

// 定义目录项的类型接口
type DirectoryItem = {
  text: string // 显示的文本
  link: string // 链接地址
}

// 定义目录结构的类型接口
type DirectoryStructure = {
  [key: string]: {
    text: string // 目录名称
    items: DirectoryItem[] // 目录下的文件列表
  }[]
}

/**
 * 判断文件是否为markdown文件
 * @param fileName 文件名
 * @returns 如果是.md文件返回true，否则返回false
 */
const isMdFile = (fileName: string): boolean => {
  return /\.md$/.test(fileName)
}

/**
 * 读取指定目录，生成目录结构
 * @param name 目录名称
 * @returns 返回目录结构对象
 */
export const readDirectory = (
  name: string,
  folderName: string = 'notes'
): DirectoryStructure => {
  // 读取目录下的所有文件

  const directoryPath = path.resolve(__dirname, `${folderName}/${name}`)

  const items = fs.readdirSync(directoryPath)

  const formatItems = items.map((item, index) => {
    const isMarkdown = isMdFile(item)
    return {
      text: isMarkdown ? `${index + 1}. ${item.replace(md, '')}` : '',
      link: `/${path.join(folderName, name, item)}`
    }
  })
  // 返回格式化后的目录结构
  return {
    [`/${folderName}/${name}/`]: [
      {
        text: name,
        items: formatItems
      }
    ]
  }
}
