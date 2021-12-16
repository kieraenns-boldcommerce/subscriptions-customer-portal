module.exports = {
  plugins: {
    "postcss-prepend-imports": {
      files: ["./src/assets/css/medias.css"],
    },
    "postcss-easy-import": {},
    "postcss-nested-ancestors": {},
    "postcss-nesting": {},
    "postcss-preset-env": { stage: 0 },
  },
};
