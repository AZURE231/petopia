export interface IPostPetPost {
  petId: string;
  content: string;
  images: string[];
}

export interface IGetPostResponse {
  id: string;
  creatorId: string;
  content: string;
  userImage: string;
  userName: string;
  like: number;
  isLiked: boolean;
  isCreatedAt: string;
  commentCount: number;
  images: string[];
}

export interface ICommentResponse {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userImage: string;
  isCreatedAt: string;
}

export interface ICommentPost {
  postId: string;
  content: string;
}
