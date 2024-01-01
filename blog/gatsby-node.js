const fs = require("fs/promises");
const path = require("path");
const { go, map, filter } = require("fxjs");

exports.onPostBuild = async () => {
  fs.appendFile(
    "public/buildlog.txt",
    `\n${new Date()}`,
    function () {
      if (err) throw err;

      console.log("Build log appended!");
    }
  );
};

exports.createPages = async ({ graphql, actions }) => {
  const IntroPage = path.resolve(`./src/pages/intro.tsx`);
  const PostDetailsTemplate = path.resolve(
    `./src/components/PostDetails.tsx`
  );
  const PostListTemplate = path.resolve(
    `./src/components/PostListTemplate.tsx`
  );

  // cannot get unpublished posts here
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

  const {
    data: {
      allStrapiTag: { edges: tags },
    },
  } = await graphql(`
    query {
      allStrapiTag {
        edges {
          node {
            id
            name
            strapiId
            posts {
              strapiId
            }
          }
        }
      }
    }
  `);

  const releaseNode = (edge) => edge.node;
  const mapIndex = (node, index) => {
    return {
      index: index + 1,
      ...node,
    };
  };

  const allPosts = go(posts, map(releaseNode)).map(
    mapIndex
  );
  const allTags = go(
    tags,
    map(releaseNode),
    filter((tag) => !!tag.posts?.length)
  );

  // Create pages
  actions.createPage({
    path: "/",
    component: IntroPage,
  });

  // Post list page
  go(allPosts, (posts) =>
    actions.createPage({
      path: "/posts",
      component: PostListTemplate,
      context: {
        header: "Posts",
        posts,
        tags: allTags,
      },
    })
  );

  // Post details page
  allPosts.forEach((post) => {
    actions.createPage({
      path: `/post/${post.slug}`,
      component: PostDetailsTemplate,
      context: {
        post,
      },
    });
  });

  // Archive list page
  const archiveItems = references.map(mapIndex);

  go(archiveItems, (archiveItems) =>
    actions.createPage({
      path: "/archive",
      component: PostListTemplate,
      context: {
        header: "Archive",
        references: archiveItems,
      },
    })
  );
};
