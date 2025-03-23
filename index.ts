import fs from 'fs'
import path from 'path'

interface SidebarItem {
  text: string
  collapsed?: boolean
  link?: string
  items?: SidebarItem[]
}

/**
 * @description: 生成侧边栏
 * @param {string} name 文件夹名称
 * @param {string} folderName 文件夹名称
 * @return {*}
 */
export const createSideBar = (name, folderName = 'docs') => {
  const basePath = path.resolve(__dirname, `${folderName}/${name}`)

  const processDirectory = (dirPath: string): any[] => {
    const files = fs.readdirSync(dirPath)

    const items: SidebarItem[] = []

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        const subItems = processDirectory(fullPath)
        if (subItems.length > 0) {
          items.push({
            text: file,
            collapsed: true,
            items: subItems
          })
        }
      } else if (file.endsWith('.md')) {
        const fileName = file.replace('.md', '')
        const relativePath = path.relative(basePath, dirPath)
        items.push({
          text: fileName,
          link: `/${folderName}/${name}/${
            relativePath ? relativePath + '/' : ''
          }${fileName === 'index' ? '' : fileName}`
        })
      }
    })
    return items
  }

  const sidebarItems = processDirectory(basePath)

  return {
    [`/${folderName}/${name}`]: [
      {
        text: name,
        collapsed: false,
        items: sidebarItems
      }
    ]
  }
}
