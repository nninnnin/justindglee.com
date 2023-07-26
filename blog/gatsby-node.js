const path = require("path");
const { go, filter, map } = require("fxjs");

exports.createPages = async ({ graphql, actions }) => {
  const blogPostTemplate = path.resolve(`./src/components/PostDetails.tsx`);
  const postListTemplate = path.resolve(
    `./src/components/PostListTemplate.tsx`
  );

  const {
    data: {
      allStrapiPost: { edges: posts },
    },
  } = await graphql(`
    query {
      allStrapiPost {
        edges {
          node {
            id
            strapiId
            title
            contents
            type
            createdAt
            updatedAt
            publishedAt
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
      allStrapiReference {
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

  const lifePosts = filter((post) => post.node.type === "life", posts).map(
    (edge, index) => ({
      index: index + 1,
      ...edge.node,
    })
  );

  const techPosts = filter((post) => post.node.type === "tech", posts).map(
    (edge, index) => ({
      index: index + 1,
      ...edge.node,
    })
  );

  const referencePosts = references.map((node, index) => ({
    index: index + 1,
    ...node,
  }));

  go(lifePosts, (posts) =>
    actions.createPage({
      path: "/life",
      component: postListTemplate,
      context: {
        header: "생활",
        posts,
      },
    })
  );

  go(techPosts, (posts) =>
    actions.createPage({
      path: "/tech",
      component: postListTemplate,
      context: {
        header: "기술",
        posts,
      },
    })
  );

  go(referencePosts, (references) =>
    actions.createPage({
      path: "/reference",
      component: postListTemplate,
      context: {
        header: "자료실",
        references,
      },
    })
  );

  [...lifePosts, ...techPosts].forEach((post) =>
    actions.createPage({
      path: `/${post.type}/${post.index}`,
      component: blogPostTemplate,
      context: {
        post,
      },
    })
  );
};
