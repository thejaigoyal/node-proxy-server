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
app.get("/.well-known/jwks.json", (_req, res) => {
  return res.json({
    keys: [
      {
        kty: "RSA",
        n:
          "wzwwEqR5p7a6CaG61i3od-GLTyype3t_f0pwwtoA9NsZANcjHaAUR_qzqlNRQlLI687vF1OfbETYLeHIT5V36QGrMfrYR_tYAoaKFixC_wOjt8EBPoeHgaTOAyGf3V3YNwocNU-StyV1X4hPmDjCrapNYpbKIcAJwq5Ij0WBKGNXBcUUbAceRtLqgzf_6x2vcQJeE5nJK5gd41f_jtlK9Xge0Ig6CcdKOI7U3agyI_iNF3SL0bnCfvtDRIkgAzzeN5Yj4S3Z4rJVQ1RgzZmqBmnjw8h06G8wDyaQPf19u4F___gF-dL1md_fVRKL5UL7OZg42hIZzwzdhrxOGcXUFQ",
        e: "AQAB",
        alg: "RS256",
        kid: "NkRGQjI5N0RBNUUwMTYwOEMxQUVGQkJBQTJBODBGNTE2MDA5NDM5RA",
        use: "sig",
      },
    ],
  });
});

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
