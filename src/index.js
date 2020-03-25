require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "world"
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

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully connected Sequelize to the database!");
  })
  .catch(err => {
    console.log(err);
  });
