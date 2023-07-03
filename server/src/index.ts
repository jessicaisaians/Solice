import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PrismaClient } from "@prisma/client";
import bodyParser, { json } from "body-parser";
import cors from "cors";
import dotEnvSafe from "dotenv-safe";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { createServer } from "http";
import fetch from "isomorphic-unfetch";
import kave from "kavenegar";
import { Session } from "next-auth";
import NodeCache from "node-cache";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import zarinpalCheckout from "zarinpal-checkout";
import resolvers from "./graphql/resolvers";
import { getServerSession } from "./utils/functions";
const zarinpal = zarinpalCheckout.create(
  "00000000-0000-0000-0000-000000000000",
  true
);

var kaveApi = kave.KavenegarApi({
  apikey: process.env.KAVE_API_KEY as string,
});
const myCache = new NodeCache({ stdTTL: 120, checkperiod: 0.25 });
const emailCache = new NodeCache({
  stdTTL: 60 * 60 * 24 * 3,
  checkperiod: 24 * 60 * 60,
});
const main = async () => {
  //* Load Config
  dotEnvSafe.config();

  const schema = await buildSchema({
    resolvers,
    validate: false,
  });
  const app = express();

  const httpServer = createServer(app);
  var cookieParser = require("cookie-parser");
  app.use(cookieParser());
  app.set("trust proxy", 1);
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,

    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });

  await server.start();
  const corsOptions = {
    origin: [process.env.CORS_ORIGIN as string],
    credentials: true,
  };
  app.use("/product_imgs", express.static("public/images/products"));
  // app.use("/products", express.static("public/images/products"));
  app.use(
    "/graphql",
    cors(corsOptions),
    json(),
    graphqlUploadExpress({ maxFileSize: 5 * 1000 * 1000, maxFiles: 1 }),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const session: Session | null = await getServerSession(
          req.headers.cookie ?? ""
        );
        return {
          req,
          res,
          session,
          fetch,
          myCache,
          emailCache,
          kaveApi,
          zarinpal,
          prisma,
        };
      },
    })
  );

  //* View Engine
  app.set("view engine", "ejs");
  // app.set("layout", "./layouts/mainLayout");
  app.set("views", "views");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const PORT = parseInt(process.env.PORT as string);
  // Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`Server is now running on ${process.env.SERVER_ORIGIN}/graphql`);
};
main().catch((err) => console.log("Server error", err));
