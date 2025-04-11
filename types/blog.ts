export interface BlogStep {
  title: string
  content: string
  icon?: string
  images?: string[]
}

export interface BlogPost {
  id: string
  title: string
  date: string
  author: string
  description: string
  content: string
  featuredImage: string
  gallery?: string[] // New field for multiple images
  tags: string[]
  steps?: BlogStep[]
}
