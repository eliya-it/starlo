import { createClient } from "redis";
console.log(process.env.REDIS_HOST || "localhost");

const redis = createClient({
  socket: {
    host: "localhost",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  },
});
redis.on("error", (err: any) => console.error("Redis Error: ", err));

const connectRedis = async () => {
  try {
    await redis.connect();
  } catch (error: any) {
    console.error("An error occured while connecting to redis: ", error);
  }
};
connectRedis();
export default redis;
