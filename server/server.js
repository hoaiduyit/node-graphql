var express = require('express');
var graphqlHTTP = require('express-graphql');
var Schema = require('./schema');

const APP_PORT = 8080;

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true,
    formatError: (error) => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path
    })
  })
);

app.listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
