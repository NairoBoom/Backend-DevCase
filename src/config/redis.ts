import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379
  }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  await redisClient.connect();
  console.log('Connected to Redis');
};

export default redisClient;
