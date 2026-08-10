export interface ImageRef {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: ImageRef | null;
}

export interface Category {
  slug: string;
  name: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  coverImage?: ImageRef | null;
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingTime: number; // minutos estimados
  author: Author;
  featured?: boolean;
}

export interface ArticleDetail extends Article {
  body: string; // markdown / contenido del artículo
  gallery?: ImageRef[]; // imágenes adicionales de la galería
  kicker?: string;
  tags?: Array<{ slug: string; name: string }>;
}

export interface FeaturedArticle extends Article {
  kicker?: string;
}