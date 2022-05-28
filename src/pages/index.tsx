import React from "react";
import Navigation from "@components/Navigation.tsx";
import "@styles/index.scss";

export default function IndexPage() {
  return (
    <div className="bg-slate-300 flex flex-row w-screen h-screen">
      <Navigation />

      <p className="flex-1 max-w-[700px] mx-auto my-[10vh]">
        <h1 className="text-2xl">반갑습니다.</h1>
      </p>
    </div>
  );
}
