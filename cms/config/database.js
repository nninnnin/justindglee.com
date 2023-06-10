module.exports = ({ env }) => {
  return {
    connection: {
      // database configuration options for knex.js
      client: "postgres",
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME"),
        user: env("DATABASE_USERNAME"),
        password: env("DATABASE_PASSWORD"),
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
    settings: {
      // strapi-specific database settings
    },
  };
};
