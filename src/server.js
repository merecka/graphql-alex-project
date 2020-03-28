require("dotenv").config();
var models = require("./../models");

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    user(id: Int!): User!
  }

  type User {
    id: Int!
    email: String!
    password: String!
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String, password: String): User
  }
`;

const resolvers = {
  Query: {
    async user(root, { id }) {
      return models.User.findByPk(id);
    },
    async allUsers(root, args) {
      return models.User.findAll();
    }
  },

  Mutation: {
    async register(root, { id, email, password }) {
      return models.User.create({
        id,
        email,
        password
      })
        .then(user => {
          if (user) {
            return user;
          }
        })
        .catch(error => {
          console.log("Email address is already taken.");
          return error, null;
        });
    },

    async login(root, { email, password }) {
      return models.User.findOne({
        where: { email: email }
      }).then(user => {
        try {
          if (!user) {
            throw new Error("This user email address does not exist.");
          } else {
            user.validPassword(password).then(result => {
              try {
                if (!result) {
                  throw new Error("This entered password is incorrect.");
                } else {
                  console.log("Successfully logged in!");
                  return user;
                }
              } catch (error) {
                console.log(error.message);
                return error.message, null;
              }
            });
          }
        } catch (error) {
          console.log(error.message);
          return error.message, null;
        }
        return user;
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: process.env.PORT }).then(() => {
  console.log(`🚀 Server ready at ${process.env.PORT}`);
});

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DEV_DATABASE_URL);

models.sequelize.sync().then(() => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Successfully connected Sequelize to the database!");
    })
    .catch(err => {
      console.log(err);
    });
});
