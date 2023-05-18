import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/server/graphql/schema.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/client-gen/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql"
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
