export interface PostQueryResult {
  allStrapiPost: {
    edges: Array<{
      node: Post;
    }>;
  };
}

export interface Tag {
  id: string;
  name: string;
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
  slug: string;
  tags: null | Array<Tag>;
}

export interface Reference {
  index: number;
  id: number;
  strapiId: number;
  url: string;
  caption: string;
  createdAt: string;
}
