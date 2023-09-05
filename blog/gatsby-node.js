const path = require("path");
const { go, filter, map } = require("fxjs");

exports.createPages = async ({ graphql, actions }) => {
  const IndexPageTemplate = path.resolve(
    `./src/components/Index.tsx`
  );
  const PostDetailsTemplate = path.resolve(
    `./src/components/PostDetails.tsx`
  );
  const PostListTemplate = path.resolve(
    `./src/components/PostListTemplate.tsx`
  );

  const {
    data: {
      allStrapiPost: { edges: posts },
    },
  } = await graphql(`
    query {
      allStrapiPost(sort: { createdAt: DESC }) {
        edges {
          node {
            id
            strapiId
            title
            contents
            type
            createdAt
            publishedAt
            slug
            tags {
              id
              name
            }
          }
        }
      }
    }
  `);

  const {
    data: {
      allStrapiReference: { nodes: references },
    },
  } = await graphql(`
    query {
      allStrapiReference(sort: { createdAt: DESC }) {
        nodes {
          strapiId
          id
          url
          createdAt
          caption
        }
      }
    }
  `);

  const releaseNode = (edge) => edge.node;
  const filterByType = (type) => (post) =>
    post.type === type;
  const mapIndex = (node, index) => {
    return {
      index: index + 1,
      ...node,
    };
  };

  const lifePosts = go(
    posts,
    map(releaseNode),
    filter(filterByType("life"))
  ).map(mapIndex);

  const techPosts = go(
    posts,
    map(releaseNode),
    filter(filterByType("tech"))
  ).map(mapIndex);

  const referencePosts = references.map(mapIndex);

  go(lifePosts, (posts) =>
    actions.createPage({
      path: "/life",
      component: PostListTemplate,
      context: {
        header: "생활",
        posts,
      },
    })
  );

  go(techPosts, (posts) =>
    actions.createPage({
      path: "/tech",
      component: PostListTemplate,
      context: {
        header: "기술",
        posts,
      },
    })
  );

  go(referencePosts, (references) =>
    actions.createPage({
      path: "/reference",
      component: PostListTemplate,
      context: {
        header: "자료실",
        references,
      },
    })
  );

  const allPosts = [...lifePosts, ...techPosts];

  // index page
  actions.createPage({
    path: "/",
    component: IndexPageTemplate,
    context: {
      posts: allPosts,
    },
  });

  // post details
  allPosts.forEach((post) => {
    actions.createPage({
      path: `/${post.type}/${post.slug}`,
      component: PostDetailsTemplate,
      context: {
        post,
      },
    });
  });
};
