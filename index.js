// Dependencies
const express = require("express");
const proxy = require("http-proxy-middleware");

// Config
const { routes } = require("./config.json");

const app = express();

for (route of routes) {
    app.use(route.route,
        proxy.createProxyMiddleware({
            target: route.address,
            pathRewrite: (path) => {
                const newPath = "/" + path.split("/").slice(2).join("/"); // Could use replace, but take care of the leading '/'
                console.log("path >> ", path, newPath);
                return newPath;
            },
            changeOrigin: true
        })
    );
}

app.use(
    "/mybusiness/services-subscriptions/*",
    proxy.createProxyMiddleware({
      target: "http://localhost:3003",
      pathRewrite: (path) => {
          const newPath = "/" + path.split("/").slice(3).join("/"); // Could use replace, but take care of the leading '/'
          console.log("subscription path gen >> ", path, newPath);
          return newPath;
      },
    //   changeOrigin: true,
    })
  );

app.use(
    "/mybusiness/services-subscriptions",
    proxy.createProxyMiddleware({
      target: "http://localhost:3003",
      pathRewrite: (path) => {
          const newPath = "/" + path.split("/").slice(3).join("/"); // Could use replace, but take care of the leading '/'
          console.log("subscription path >> ", path, newPath);
          return newPath;
      },
    //   changeOrigin: true,
    })
  );

app.use(
  "/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:3001",
    pathRewrite: (path) => {
    console.log("base path > ", path)
      return path;
    },
    // changeOrigin: true,
  })
);

app.listen(3000, () => {
  console.log("Proxy listening on port 3000");
});
