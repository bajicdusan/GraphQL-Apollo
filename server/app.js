const express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
// const { ApolloServer } = require('apollo-server-express');

const app = express();

// allow cross-origin requests
app.use(cors());
// const server = new ApolloServer({ schema });
// server.applyMiddleware({ app });

// connect to the mlab (mongodb atlas) database
// replace <username> and <password>
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.copib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log("Connected to MongoDB Atlas"))
 .catch(err => console.log("Error: ", err.message));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
