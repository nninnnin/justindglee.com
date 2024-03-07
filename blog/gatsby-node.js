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
          title
          caption
          publisher
          createdAt
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

  console.log("올포", allPosts);

  // Tech posts
  go(
    allPosts.filter((post) => post.type === "tech"),
    (posts) =>
      actions.createPage({
        path: "/tech",
        component: PostListTemplate,
        context: {
          header: "Tech",
          posts,
          tags: allTags,
        },
      })
  );

  // Life posts
  go(
    allPosts.filter((post) => post.type === "life"),
    (posts) =>
      actions.createPage({
        path: "/life",
        component: PostListTemplate,
        context: {
          header: "Life",
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
  console.log(references);

  const archiveItems = references
    .filter((item) => {
      return !!item.title;
    })
    .map(mapIndex);

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
