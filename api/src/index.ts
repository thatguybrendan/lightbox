import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import cors from "@fastify/cors";

import routes from "./routes";
import "./types/fastifyTypes";

const app = Fastify({ logger: true }); // you can disable logging

// Register Auth middleware
app.register(require("./middlewares/auth"));

// Register Permissions middleware
app.register(require("./middlewares/permissions/conversationPermissions"));
app.register(require("./middlewares/permissions/userPermissions"));

// Register CORS
app.register(cors, {
  origin: "http://localhost:5173",
});

// Register Routes
app.register(routes);

/**
 * Parse Request Body as JSON
 */
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body: string, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err: any) {
      err.statusCode = 400;
      done(err, undefined);
    }
  },
);

// graceful shutdown
const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    process.exit(0);
  });
});

// Start the server
async function main() {
  await app.listen({
    port: 3000,
    host: "0.0.0.0",
  });
}

main();
