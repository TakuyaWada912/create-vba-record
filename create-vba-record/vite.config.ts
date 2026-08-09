import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        watch: {
            usePolling: true,
            interval: 1000,
        },
        host: "127.0.0.1",
    },
});
