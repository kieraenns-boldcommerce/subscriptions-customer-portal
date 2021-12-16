const rewirePostCSSReactLoader = require("react-app-rewire-postcss");
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

module.exports = function override(config, env) {
  rewirePostCSSReactLoader(config, true);
  config = rewireSvgReactLoader(config, env);

  return config;
};
