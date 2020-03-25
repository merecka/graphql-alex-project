require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "alexmerecka",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: false
  }
};
