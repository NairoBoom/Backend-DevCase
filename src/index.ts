import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { connectRedis } from './config/redis';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import loggerMiddleware from './middleware/logger';
import { startCronJobs } from './services/cronService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Setup middlewares
app.use(express.json());
app.use(loggerMiddleware);

// Redirect root to GraphQL endpoint
app.get('/', (req, res) => {
  res.redirect('/graphql');
});

// Setup GraphQL endpoint with interactive interface
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

const startServer = async () => {
  try {
    // Verify database connection
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Connect to Redis for caching
    await connectRedis();

    // Start cron jobs for periodic updates
    startCronJobs();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
      console.log(`GraphiQL interface available at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
