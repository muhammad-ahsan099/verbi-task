// src/types/index.ts

export interface NewsItem {
  id: number;
  title: string;
  preview: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface NewsItemWithRelated extends NewsItem {
  relatedNews: {
    title: string;
    link: string;
  }[];
}
