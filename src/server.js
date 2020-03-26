require("dotenv").config();
var models = require("./../models");

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    allUsers: [User!]!
    user(id: Int!): User!
  }

  type User {
    id: Int!
    email: String!
    password: String!
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): User!
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
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
      });
    },

    async login(root, { email, password }) {
      return models.User.findOne({ where: { email, password } }).then(user => {
        console.log(user);
        if (!user) {
          console.log("This user email address does not exist.");
        } else if (!user.validPassword(password)) {
          console.log("This entered password is incorrect.");
        } else {
          console.log("Successfully logged in.");
        }
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