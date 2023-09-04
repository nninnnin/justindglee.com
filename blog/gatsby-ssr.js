const React = require("react");
const { RecoilRoot } = require("recoil");

exports.wrapPageElement = ({ element }) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
