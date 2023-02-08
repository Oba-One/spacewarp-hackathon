import { defineConfig } from "vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  server: {
    port: 3002,
    fs: {
      strict: false,
    },
  },
  build: {
    rollupOptions: {
      external: ["@latticexyz/network"],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
    exclude: ["@latticexyz/network"],
    include: [
      "proxy-deep",
      "ethers/lib/utils",
      "bn.js",
      "js-sha3",
      "hash.js",
      "bech32",
      "long",
      "protobufjs/minimal",
      "debug",
      "is-observable",
      "nice-grpc-web",
      "@improbable-eng/grpc-web",
    ],
  },
});
