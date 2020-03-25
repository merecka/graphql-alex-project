require("dotenv").config();
module.exports = {
  development: {
    use_env_variable: "DEV_DATABASE_URL"
  }
};
