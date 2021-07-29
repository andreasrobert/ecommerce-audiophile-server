import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import cors from'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;




async function startApolloServer(typeDefs: any, resolvers: any) {
    mongoose.connect('mongodb+srv://robert1:one2three@nodetuts.fx0g8.mongodb.net/E-commerce?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
    const app = express();
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, ()=>{
            console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
        });
    
    // app.use('/static', express.static('public'));
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/",routes);
    


  }

  startApolloServer(typeDefs,resolvers)
