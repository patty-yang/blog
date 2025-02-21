import fs from 'fs'
import path from 'path'
const mdExtension = /\.md$/

interface Item {
  text: string
  isFile: boolean
  items?: Item[]
  collapsed?: boolean
  link: string | undefined
}

const isMdFile = (fileName: string): boolean => {
  return mdExtension.test(fileName)
}
// 读取目录下的文件和文件夹
export const readDirectory = (directoryPath): Item[] => {
  // 获取目录下的所有子项
  const items = fs.readdirSync(path.resolve(__dirname, directoryPath))

  // 生成数组结构
  const structure: any[] = []
  items.forEach((item, index) => {
    // 构建子项的完整路径
    const itemPath = path.join(directoryPath, item)
    // 判断子项是文件还是文件夹
    const isFile = fs.statSync(path.resolve(__dirname, itemPath)).isFile()
    // 生成子项对象

    const itemObject: Item = {
      text: isFile
        ? ((isMdFile(item) &&
            `${index + 1}.${item.replace(mdExtension, '')}`) as string)
        : `${item.replace(mdExtension, '')}`,
      isFile: isFile,
      items: [],
      link: isFile ? `/docs/${itemPath}` : undefined
    }

    // 如果是文件夹，则递归读取子项
    if (!isFile) {
      itemObject['collapsed'] = false
      itemObject.items = readDirectory(itemPath)
    }
    // 将子项对象添加到数组结构中
    structure.push(itemObject)
  })

  return structure
}
