const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

// create a new instace of apollo
const server = new ApolloServer({ typeDefs, resolvers});

const startApolloServer = async () => {
  // start the apollo server
  await server.start();

  // middleware parses incoming requests with URL encoded payloads
  app.use(express.urlencoded({ extended: true }));
  // middleware parses incoming requests with JSON payloads
  app.use(express.json());

  // middleware incoming requests to the GraphQL enppoint
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    });
  }

  // once the database conncection is open, indicate its open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

process.on('error',(e) => {console.error(e)});
startApolloServer();