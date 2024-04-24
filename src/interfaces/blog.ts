export interface IBlogResponse {
  id: string;
  category: number;
  title: string;
  excerpt: string;
  image: string;
}

export interface IBlog {
  title: string;
  excerpt: string;
  image: string;
  category: number;
  content: string;
}