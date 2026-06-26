import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/** Configuración de Vitest para los tests unitarios (funciones puras de lib). */
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
