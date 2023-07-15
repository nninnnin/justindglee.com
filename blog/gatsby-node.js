const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const blogPostTemplate = path.resolve(`./src/components/PostDetails.tsx`);

  const generatePage = (edge) =>
    actions.createPage({
      path: `/post/${edge.node.id}`,
      component: blogPostTemplate,
      context: {
        id: edge.node.id,
      },
    });

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

  edges.forEach((edge) => generatePage(edge));
};
