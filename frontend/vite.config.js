import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite's config file. Tells Vite to use the React plugin
// so it knows how to handle .jsx files and React's fast refresh.
export default defineConfig({
  plugins: [react()],
});
