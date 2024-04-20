export interface IPostPetPost {
  petId: string;
  content: string;
  images: string[];
}

export interface IGetPostResponse {
  id: string;
  userId: string;
  content: string;
  userImage: string;
  userName: string;
  like: number;
  isLiked: boolean;
  isCreatedAt: string;
  commentCount: number;
  images: string[];
}
