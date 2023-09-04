"use strict";

/**
 *  post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => {
  return {
    async findBySlug(ctx) {
      const { slug } = ctx.params;

      const query = {
        filters: { slug },
        ...ctx.query,
      };

      const post = await strapi.entityService.findMany("api::post.post", query);

      const sanitizedEntity = await this.sanitizeOutput(post);

      return this.transformResponse(sanitizedEntity[0]);
    },
  };
});
