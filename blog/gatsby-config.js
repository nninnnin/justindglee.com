/** @type {import('gatsby').GatsbyConfig} */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `저스틴 블로그`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-classes",
            options: {
              classMap: {
                paragraph: "para",
              },
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        implementation: require("sass"),
        sassOptions: {
          // indentedSyntax: true,
        },
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom tailwindcss configuration
        ],
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@styles": "./src/styles",
          "@components": "./src/components",
          "@src": "./src",
        },
        extensions: ["js, jsx, tsx, sass, scss, css"],
      },
    },
    {
      resolve: "gatsby-source-strapi-graphql",
      options: {
        apiURL: process.env.GATSBY_STRAPI_API_URL,
        token: process.env.GATSBY_STRAPI_TOKEN,
        collectionTypes: ["Post"],
      },
    },
  ],
};
