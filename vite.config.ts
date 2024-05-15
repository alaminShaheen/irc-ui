import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { GOOGLE_MAPS_API_KEY = "" } = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
    },
    build: {
      outDir: "./dist",
    },
    define: {
      "process.env.GOOGLE_MAPS_API_KEY": JSON.stringify(GOOGLE_MAPS_API_KEY),
    },
    resolve: {
      alias: {
        "@/pages": path.resolve(__dirname, "./src/pages"),
        "@/components": path.resolve(__dirname, "./src/components"),
        "@/services": path.resolve(__dirname, "./src/services"),
        "@/models": path.resolve(__dirname, "./src/models"),
        "@/lib": path.resolve(__dirname, "./src/lib"),
        "@/context": path.resolve(__dirname, "./src/context"),
        "@/assets": path.resolve(__dirname, "./src/assets"),
        "@/constants": path.resolve(__dirname, "./src/constants"),
        "@/api": path.resolve(__dirname, "./src/api"),
        "@/hooks": path.resolve(__dirname, "./src/hooks"),
        "@/utils": path.resolve(__dirname, "./src/utils"),
        "@/locales": path.resolve(__dirname, "./src/locales"),
        "@/data": path.resolve(__dirname, "./src/data"),
      },
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
  };
});
