import express from 'express';
import graphqlHTTP from 'express-graphql';
import  schema  from './schema/index.js';
import mongoose from 'mongoose';
import credentials from './credentials.js';
/*
./credentials.js

const credentials  = {
    "userId": "chenzjmwang",
    "password": "JSNHhlGVgaq9p2Nx"
  }

export default credentials;
*/
const app = express();

const dbURI = `mongodb+srv://${credentials.userId}:${credentials.password}@cluster0.fwz70ks.mongodb.net/widgets?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.get('/', (req, res) => {
    res.send('GraphQL is amazing!');
});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('Server running on port 4000')
});