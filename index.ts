
import fs from 'fs'
import path from 'path'
const md = /\.md$/

type DirectoryItem = {
  text: string
  link: string
}

type DirectoryStructure = {
  [key: string]: {
    text: string
    items: DirectoryItem[]
  }[]
}

const isMdFile = (fileName: string): boolean => {
  return /\.md$/.test(fileName)
}

export const readDirectory = (name: string): DirectoryStructure => {
  const items = fs.readdirSync(path.resolve(__dirname, name))

  return {
    [`/${name}/`]: [
      {
        text: name,
        items: items.map((item, index) => ({
          text: isMdFile(item) ? `${index + 1}. ${item.replace(md, '')}` : '',
          link: `/${path.join(name, item)}`
        }))
      }
    ]
  }
}
