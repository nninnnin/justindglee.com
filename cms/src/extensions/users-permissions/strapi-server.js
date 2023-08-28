const createError = require("http-errors");

module.exports = (plugin) => {
  plugin.controllers.auth.tokenDecrypt = async function (ctx) {
    const { token } = ctx.request.body;

    if (!token) {
      return ctx.badRequest("`token` param is missing");
    }

    try {
      const decrypted = await strapi.plugins[
        "users-permissions"
      ].services.jwt.verify(token);

      return decrypted;
    } catch (err) {
      console.log(err);

      throw createError(401, "Invalid token");
    }
  };

  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/token/decrypt",
    handler: "auth.tokenDecrypt",
  });

  return plugin;
};
