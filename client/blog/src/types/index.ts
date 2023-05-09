export interface Post {
  id: number;
  attributes: {
    contents: string;
    createdAt: string;
    publishedAt: string;
    title: string;
    type: string;
    updatedAt: string;
  };
}
