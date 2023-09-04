module.exports = {
  routes: [
    {
      method: "GET",
      path: "/post/find-by-slug/:slug",
      handler: "api::post.post.findBySlug",
    },
  ],
};
