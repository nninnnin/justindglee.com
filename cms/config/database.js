const parse = require("pg-connection-string").parse;

module.exports = ({ env }) => {
  const prodDBConfig = parse(env("DATABASE_URL"));

  const connection =
    env("DB_ENV") === "prod"
      ? {
          client: "postgres",
          connection: {
            host: prodDBConfig.host,
            port: prodDBConfig.port,
            database: prodDBConfig.database,
            user: prodDBConfig.user,
            password: prodDBConfig.password,
            ssl: {
              rejectUnauthorized: false,
            },
          },
          useNullAsDefault: true,
          debug: false,
        }
      : {
          client: "postgres",
          connection: {
            host: env("DATABASE_HOST", "localhost"),
            port: env.int("DATABASE_PORT", 5432),
            database: env("DATABASE_NAME"),
            user: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
            ssl: false,
          },
          useNullAsDefault: true,
          debug: false,
        };

  return {
    connection,
    settings: {
      // strapi-specific database settings
    },
  };
};
