import React from "react";
import Layout from "@components/Layout";
import "@styles/index.scss";

export default function IndexPage() {
  return (
    <Layout>
      이곳은 테크
      <br />
      <br />
      <ul className="tech-list bg-red">
        <li>하하</li>
        <li>하하</li>
        <li>하하</li>
        <li>하하</li>
        <li>하하</li>
      </ul>
    </Layout>
  );
}
