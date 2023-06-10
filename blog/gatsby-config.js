/** @type {import('gatsby').GatsbyConfig} */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
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
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.GATSBY_STRAPI_API_URL,
        accessToken: process.env.GATSBY_STRAPI_TOKEN,
        collectionTypes: ["post"],
      },
    },
  ],
};
