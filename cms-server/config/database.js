const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5433),
      database: env("DATABASE_NAME", "Blog"),
      user: env("DATABASE_USERNAME", "justin"),
      password: env("DATABASE_PASSWORD", "#justin820"),
      ssl:
        process.env.NODE_ENV !== "production"
          ? false
          : {
              rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
            },
    },
    useNullAsDefault: true,
    debug: false,
  },
});
