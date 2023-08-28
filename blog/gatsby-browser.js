const { RecoilRoot } = require("recoil");
require("@styles/index.scss");
const { createElement } = require("react");

module.exports.wrapRootElement = ({ element }) => {
  return createElement(RecoilRoot, null, element);
};
