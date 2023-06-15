export interface PostQueryResult {
  allStrapiPost: {
    edges: Array<{
      node: Post;
    }>;
  };
}

export interface Post {
  id: number;
  title: string;
  contents: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
