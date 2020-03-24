require("dotenv").config();

//Configure and Initialize Apollo Server
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

// Connect Sequelize to Postgres database
const Sequelize = require("sequelize");
const sequelize = new Sequelize("alexmerecka", "alexmerecka", "password", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Success!");
  })
  .catch(err => {
    console.log(err);
  });
