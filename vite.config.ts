import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// Production CSP as a <meta> tag, a fallback in case the host ignores public/_headers.
// Build only: the dev server (and Lovable's editor preview) needs inline scripts for hot reload.
// frame-ancestors is ignored in <meta>, so it lives in public/_headers only. Keep both in sync.
const SUPABASE_HOST = "apbvidphqdytjocorasi.supabase.co";
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  `connect-src 'self' https://${SUPABASE_HOST} wss://${SUPABASE_HOST} https://formspree.io https://rss.beehiiv.com https://openlibrary.org https://covers.openlibrary.org https://www.googleapis.com`,
  "frame-src 'self' https://open.spotify.com https://suno.com https://www.youtube.com https://www.youtube-nocookie.com https://calendly.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "upgrade-insecure-requests",
].join("; ");

const cspMeta = (): Plugin => ({
  name: "csp-meta",
  apply: "build",
  transformIndexHtml: () => [
    { tag: "meta", attrs: { "http-equiv": "Content-Security-Policy", content: CSP }, injectTo: "head-prepend" },
  ],
});

const REQUIRED_ENV = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"] as const;

export default defineConfig(({ command, mode }) => {
  // Fail the build loudly instead of shipping a site that throws "supabaseUrl is required".
  if (command === "build") {
    const env = { ...loadEnv(mode, process.cwd(), "VITE_"), ...process.env };
    const missing = REQUIRED_ENV.filter((k) => !env[k]);
    if (missing.length) {
      throw new Error(`Missing ${missing.join(", ")}. Restore .env (Lovable Cloud values) before building.`);
    }
  }
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), cspMeta(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
  };
});
