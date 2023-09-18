export interface PostQueryResult {
  allStrapiPost: {
    edges: Array<{
      node: Post;
    }>;
  };
}

export type Populate<Type, Field extends keyof Type> = Omit<
  Type,
  Field
> & {
  [Field in keyof Type]: StrapiResponseData<Type[Field]>;
};

export type StrapiResponseData<T> = T extends null
  ? null
  : {
      data: T extends any[]
        ? Array<{
            id: number;
            attributes: Omit<T[number], "id">;
          }>
        : {
            id: number;
            attributes: Omit<T, "id">;
          };
      meta: unknown;
    };

export interface TagInterface {
  id: number;
  name: string;
  posts: Array<number>;
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
