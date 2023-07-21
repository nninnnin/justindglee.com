const path = require("path");
const { go, filter, map } = require("fxjs");

exports.createPages = async ({ graphql, actions }) => {
  const blogPostTemplate = path.resolve(`./src/components/PostDetails.tsx`);
  const postListTemplate = path.resolve(
    `./src/components/PostListTemplate.tsx`
  );

  const {
    data: {
      allStrapiPost: { edges },
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

  const lifePosts = filter((post) => post.node.type === "life", edges).map(
    (edge, index) => ({
      index: index + 1,
      ...edge.node,
    })
  );

  const techPosts = filter((post) => post.node.type === "tech", edges).map(
    (edge, index) => ({
      index: index + 1,
      ...edge.node,
    })
  );

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

  console.log([...lifePosts, ...techPosts]);

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
