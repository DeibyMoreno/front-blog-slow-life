import type { CodegenConfig } from "@graphql-codegen/cli";

// Se usa el esquema SDL local (`schema.graphql`) derivado de la documentación
// de la API, de modo que los tipos se generan sin depender de un backend activo.
// Cuando el backend esté disponible, cambia `schema` a tu endpoint real, p. ej.:
//   schema: "http://localhost:4000/graphql"
const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/**/*.gql", "src/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        dedupeFragments: true,
        scalars: {
          UUID: "string",
          DateTime: "string",
          Email: "string",
        },
      },
    },
  },
};

export default config;