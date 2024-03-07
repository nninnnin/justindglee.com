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
          description:
            "기술적인 배움 또는 궁금증과 관련된 이야기들이 모여있습니다.",
          posts,
          tags: allTags,
        },
      })
  );

  // Idea posts
  go(
    allPosts.filter((post) => post.type === "idea"),
    (posts) =>
      actions.createPage({
        path: "/idea",
        component: PostListTemplate,
        context: {
          header: "Idea",
          description:
            "과거와 현재, 그리고 미래에 관한 여러가지 생각들을 가끔 정리해둡니다.",
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
          description:
            "개인적인 일상과 관련된 이야기들 입니다.",
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
        description:
          "관심과 흥미가 기울여지는 자료들을 모아둔 곳입니다.",
        references: archiveItems,
      },
    })
  );
};
