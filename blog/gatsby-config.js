/** @type {import('gatsby').GatsbyConfig} */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  proxy: {
    prefix: "/",
    url: "https://justindglee.com",
  },
  siteMetadata: {
    title: `저스틴 블로그`,
    siteUrl: `https://justindglee.com`,
  },
  plugins: [
    "gatsby-plugin-netlify",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
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
          "@icons": "./src/icons",
          "@hooks": "./src/hooks",
          "@src": "./src",
        },
        extensions: [
          "js, jsx, tsx, sass, scss, css, png, svg",
        ],
      },
    },
    {
      resolve: "gatsby-source-strapi-graphql",
      options: {
        apiURL: process.env.GATSBY_STRAPI_API_URL,
        token: process.env.GATSBY_STRAPI_TOKEN,
        collectionTypes: ["Post", "Reference", "Tag"],
        cache: false,
      },
    },
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-6HB50XGJKT"],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          send_page_view: true,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
  ],
};
