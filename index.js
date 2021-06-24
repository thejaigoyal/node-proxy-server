// Dependencies
const express = require("express");
const proxy = require("http-proxy-middleware");

// Config
const { routes } = require("./config.json");

const app = express();

// for (route of routes) {
//     app.use(route.route,
//         proxy.createProxyMiddleware({
//             target: route.address,
//             pathRewrite: (path) => {
//                 const newPath = "/" + path.split("/").slice(2).join("/"); // Could use replace, but take care of the leading '/'
//                 console.log("path >> ", path, newPath);
//                 return newPath;
//             },
//             changeOrigin: true
//         })
//     );
// }
// {
//   "route": "/mybusiness/services-subscriptions/aircycle",
//   "address": "http://localhost:3005"
// },
// {
//   "route": "/mybusiness/services-subscriptions/aircycle/*",
//   "address": "http://localhost:3005/index.html"
// },
// {
//   "route": "/mybusiness/services-subscriptions",
//   "address": "http://localhost:3004"
// },
// {
//   "route": "/mybusiness/services-subscriptions/*",
//   "address": "http://localhost:3004/index.html"
// },
app.use(
  "/mybusiness/services-subscriptions/aircycle/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:3005",
    pathRewrite: (path) => {
        const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
        console.log("aircycle path gen >> ", path, newPath);
        return newPath;
    },
  //   changeOrigin: true,
  })
);

app.use(
  "/mybusiness/services-subscriptions/aircycle",
  proxy.createProxyMiddleware({
    target: "http://localhost:3005",
    pathRewrite: (path) => {
        const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
        console.log("aircycle path >> ", path, newPath);
        return newPath;
    },
  //   changeOrigin: true,
  })
);

app.use(
  "/mybusiness/services-subscriptions/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:3004",
    pathRewrite: (path) => {
        const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
        console.log("subscription path gen >> ", path, newPath);
        return newPath;
    },
  //   changeOrigin: true,
  })
);

app.use(
  "/mybusiness/services-subscriptions",
  proxy.createProxyMiddleware({
    target: "http://localhost:3004",
    pathRewrite: (path) => {
        const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
        console.log("subscription path >> ", path, newPath);
        return newPath;
    },
  //   changeOrigin: true,
  })
);

app.use(
  "/perks/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:3003",
    pathRewrite: (path) => {
        const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
        console.log("perks path gen >> ", path, newPath);
        return newPath;
    },
  //   changeOrigin: true,
  })
);

app.use(
  "/perks",
  proxy.createProxyMiddleware({
    target: "http://localhost:3003",
    pathRewrite: (path) => {
        const newPath = "/" + path.split("/").slice(1).join("/"); // Could use replace, but take care of the leading '/'
        console.log("perks path >> ", path, newPath);
        return newPath;
    },
  //   changeOrigin: true,
  })
);

app.use(
  "/*",
  proxy.createProxyMiddleware({
    target: "http://localhost:3002",
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
