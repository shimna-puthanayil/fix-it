const express = require("express");
// Import the ApolloServer and expressMiddleware helper function
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const PORT = process.env.PORT || 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
const startApolloServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );
  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running at port ${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};
startApolloServer();
