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
  const filterByPublishingState =
    ({ published }) =>
    (post) =>
      published === Boolean(post.publishedAt);
  const mapIndex = (node, index) => {
    return {
      index: index + 1,
      ...node,
    };
  };

  const allPosts = go(posts, map(releaseNode)).map(
    mapIndex
  );
  const drafts = go(
    allPosts,
    filter(filterByPublishingState({ published: false }))
  );
  const publishedPosts = go(
    allPosts,
    filter(filterByPublishingState({ published: true }))
  );

  // Create pages..
  // Index page
  actions.createPage({
    path: "/",
    component: IndexPageTemplate,
    context: {
      posts: publishedPosts,
    },
  });

  // Post list page
  go(allPosts, (posts) =>
    actions.createPage({
      path: "/posts",
      component: PostListTemplate,
      context: {
        header: "포스트",
        posts,
      },
    })
  );

  // Post details page
  drafts.forEach((post, index) => {
    actions.createPage({
      path: `/post/${post.slug}`,
      component: PostDetailsTemplate,
      context: {
        post,
      },
      defer: index > 5,
    });
  });

  publishedPosts.forEach((post) => {
    actions.createPage({
      path: `/post/${post.slug}`,
      component: PostDetailsTemplate,
      context: {
        post,
      },
    });
  });

  // Reference list page
  const referencePosts = references.map(mapIndex);

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
};
