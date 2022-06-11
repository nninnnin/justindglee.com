import React from "react";
import Layout from "@components/Layout";
import Navigation from "@components/Navigation";
import "@styles/index.scss";

export default function IndexPage() {
  return <Layout contents={<span className="text-2xl">반갑습니다.</span>} />;
}
