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
  id?: string;
  strapiId?: number;
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
  publicationState?: PublicationStates;
}

export interface Reference {
  index: number;
  id: number;
  strapiId: number;
  title: string;
  url: string;
  caption: string;
  publisher: string;
  createdAt: string;
}

export type PublicationStates =
  | "draft"
  | "publishing"
  | "published";
