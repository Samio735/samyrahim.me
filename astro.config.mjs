import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  trailingSlash: "never", // or 'never' to be consistent
  build: {
    format: "directory", // This helps with clean URLs
  },
});
