import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
    year: string
    monthDay: string
  }
  tags: string[]
  excerpt?: string | undefined
  desc?: string
}

export declare const data: Post[]

export default createContentLoader('posts/**/*.md', {
  // excerpt: excerptFn,
  transform(raw): Post[] {
    console.log(raw)
    return raw.map(({url, frontmatter, excerpt}) => ({
      title: frontmatter.title,
      url,
      date: formatDate(frontmatter.date),
      tags: frontmatter.tags,
      desc: frontmatter.desc || ''
    })).sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('zh-Hans', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }),
    year: date.toLocaleDateString('zh-Hans', {
      year: 'numeric'
    }),
    monthDay: date.toLocaleDateString('zh-Hans', {
      month: '2-digit',
      day: '2-digit'
    })
  }
}