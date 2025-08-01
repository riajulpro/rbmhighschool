// Define the Post interface based on your schema
export interface IPost {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Extended interface for populated author data
export interface IPostWithAuthor extends Omit<IPost, "authorId"> {
  author?: {
    _id: string;
    name: string;
    avatar?: string;
  };
}
