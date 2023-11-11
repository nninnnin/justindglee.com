import React from "react";
import { shuffle } from "lodash";

import Layout from "@components/Layout";
import "@styles/index.scss";
import Button from "@components/common/Button";

const greetings = ["Hello"];

function pickGreeting(greetings: Array<string>): string {
  return shuffle(greetings)[0];
}

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1 className="header">
          {pickGreeting(greetings)}
        </h1>

        <h2 className="mt-0">소개</h2>
        <p className="pb-[10px]">
          멋진 것들만 만들고 싶다는 꿈이 있습니다..
        </p>

        <h2>좋아하는 것</h2>
        <p className="pb-[10px]">게임, 쇼핑, 음악</p>

        <p className="flex-1 mt-5 relative min-h-[100px] flex items-end justify-end">
          <a href="https://github.com/nninnnin">
            <Button.Item>깃허브 구경하기</Button.Item>
          </a>

          <a href="mailto:nninnnin7@gmail.com">
            <Button.Item>이메일 보내기</Button.Item>
          </a>
        </p>
      </div>
    </Layout>
  );
}
