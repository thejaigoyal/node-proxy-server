// Dependencies
const express = require("express");
const cors = require("cors");
const proxy = require("http-proxy-middleware");

// Config

const app = express();
app.use(cors());

app.get("/manifest.json", (_req, res) => {
  return res.json({
    short_name: "GTF",
    name: "Ground Truth Factory",
    icons: [
      {
        src: "RediMindsLogo.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    start_url: ".",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff",
  });
});

app.use(
  "/viewer/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:8888/",
    pathRewrite: (path) => {
      const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
      console.log("viewer path gen >> ", path, newPath, "\n");
      return newPath;
    },
    //   changeOrigin: true,
  })
);

app.use(
  "/viewer",
  proxy.createProxyMiddleware({
    target: "http://localhost:8888/",
    pathRewrite: (path) => {
      const newPath = "/"; // Could use replace, but take care of the leading '/'
      console.log("viewer path >> ", path, newPath, "\n");
      return newPath;
    },
    //   changeOrigin: true,
  })
);

app.use(
  "/app",
  proxy.createProxyMiddleware({
    target: "http://localhost:3001/",
    // pathRewrite: (path) => {
    //   const newPath = "/"; // Could use replace, but take care of the leading '/'
    //   console.log("app path >> ", path, newPath, "\n");
    //   return newPath;
    // },
    //   changeOrigin: true,
  })
);

app.use(
  "/app/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:3001/",
    pathRewrite: (path) => {
      const newPath = "/"; // Could use replace, but take care of the leading '/'
      console.log("app/* path >> ", path, newPath, "\n");
      return newPath;
    },
    //   changeOrigin: true,
  })
);

app.use(
  "/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:8888/",
    changeOrigin: true,
    secure: false,
    pathRewrite: (path) => {
      console.log("base path > ", path, "\n");
      return path;
    },
    // changeOrigin: true,
  })
);

app.get("/", (_, res) => res.redirect("/app"));

app.listen(3030, () => {
  console.log("Proxy listening on port 3030");
});
