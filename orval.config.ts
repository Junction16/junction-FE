import * as fs from "fs";
import { defineConfig } from "orval";
import * as path from "path";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://127.0.0.1:4000";

export default defineConfig({
  yasijang: {
    output: {
      mode: "tags-split",
      target: "./app/api/endpoints/vahanaFromFileSpecWithTransformer.ts",
      client: "react-query",
      schemas: "./app/api/model",
      mock: false,
      headers: true,
      clean: true,
      override: {
        useTypeOverInterfaces: true,
        // mutator: {
        //   path: "mutator/customAxios.ts",
        //   name: "customAxios",
        // },
        operations: {},
        query: {
          useQuery: true,
          signal: true,
        },
      },
    },
    input: {
      target: `${API_URL}/api/docs.json`,
    },
    hooks: {
      afterAllFilesWrite: async () => {
        const schemasDir = path.join(__dirname, "app/api/model");

        const files = fs.readdirSync(schemasDir);

        await Promise.all(
          files.map(async (file) => {
            if (["Type"].some((suffix) => file.includes(suffix))) {
              const filePath = path.join(schemasDir, file);
              let content = fs.readFileSync(filePath, "utf8");

              content = content.replace(
                /(export const \w+Type = \{[^}]+)(\} as const;)/g,
                '$1  "": "",\n$2'
              );

              fs.writeFileSync(filePath, content, "utf8");
            } else if (["Status"].some((suffix) => file.includes(suffix))) {
              const filePath = path.join(schemasDir, file);
              let content = fs.readFileSync(filePath, "utf8");

              content = content.replace(
                /(export const \w+Status = \{[^}]+)(\} as const;)/g,
                '$1  "": "",\n$2'
              );

              fs.writeFileSync(filePath, content, "utf8");
            }
          })
        );

        // Run prettier on both Type and Status files in one command
        await import("child_process").then(({ execSync }) => {
          execSync('prettier --write "./app/api/model/*{Type,Status}.ts"', {
            stdio: "inherit",
          });
        });
      },
    },
  },
});
