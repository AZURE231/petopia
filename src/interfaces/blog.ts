export interface IBlogResponse {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: number;
  content: string;
}

export interface IBlogCardResponse {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: number;
}

export interface IBlog {
  title: string;
  excerpt: string;
  image: string;
  category: number;
  content: string;
}

export interface IBlogUpdate {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: number;
  content: string;
}
