export interface PostQueryResult {
  allStrapiPost: {
    edges: Array<{
      node: Post;
    }>;
  };
}

export interface Post {
  index: number;
  id: number;
  strapiId: number;
  title: string;
  contents: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Reference {
  index: number;
  id: number;
  strapiId: number;
  url: string;
  caption: string;
  createdAt: string;
}
