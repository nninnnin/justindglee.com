export interface PostQueryResult {
  allStrapiPost: {
    edges: Array<{
      node: Post;
    }>;
  };
}

export interface TagInterface {
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
  publishedAt: string;
  slug: string;
  tags: null | Array<TagInterface>;
}

export interface Reference {
  index: number;
  id: number;
  strapiId: number;
  url: string;
  caption: string;
  createdAt: string;
}
