module.exports = {
  client: {
    service: {
      name: "social-network-api",
      localSchemaFile: "./src/server/graphql/schema.graphql"
    }
  },
  service: {
    localSchemaFile: "./src/server/graphql/schema.graphql"
  }
};
