module.exports = {
  transpileDependencies: ["vuetify"],

  pages: {
    index: {
      entry: "src/main.js",
      title: "CryptoToFiat",
    },
  },

  // where to output built files
  outputDir: `../BackEnd/wwwroot`,

  // configure webpack-dev-server behavior
  devServer: {
    allowedHosts: ["localhost"],
    port: 8080,
    proxy: {
      "^.*": {
        target: `http://localhost:5000`,
        changeOrigin: false,
        ws: false,
      },
    },
  },
};
