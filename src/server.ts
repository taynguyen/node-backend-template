import RedisStore from "connect-redis";
import cors from 'cors';
import express from "express";
import session from "express-session";
import passport from "passport";
import Logger from "pino-http";
import { createClient } from "redis";
import { router as authRouter } from './routes/auth';
import { router as userRouter } from "./routes/users";
import { getEnv } from "./utils/env";

export async function startServer(port: number) {
  const app = express();
  app.use(
    cors({
      origin: getEnv('CORS_ORIGIN'),
      credentials: true,
    })
  );

  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Session store
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "a:",
  });
  app.use(
    session({
      secret: getEnv("SESSION_SECRET").split(","),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "none",
        // secure: true, // Don't need this, the reverse proxy will handle this
      },
      resave: false,
      saveUninitialized: false,
      store: redisStore,
    })
  );
  app.use(passport.session());
  app.use(Logger({ 
    transport: {
      target: 'pino-http-print',
      options: {
        destination: 1,
        all: true,
        translateTime: true
      }
    },
   }))

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.send("OK");
  });

  const v1Router = express.Router();
  v1Router.use("/", authRouter);
  v1Router.use("/", userRouter);
  app.use("/api/v1", v1Router);

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

process.on('uncaughtException', function(err) { 
  // Handle the error safely 
  console.log(err) 
}) 
