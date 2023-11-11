import React from "react";
import { shuffle } from "lodash";

import Layout from "@components/Layout";
import "@styles/index.scss";
import Button from "@components/common/Button";

const greetings = ["안녕하세요!"];

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

        <h2 className="mt-0">간단한 소개</h2>
        <p className="pb-[10px]">
          웹 개발자 저스틴입니다. 1인 기업을 꿈꿉니다.
        </p>

        <h2>중요하게 생각하는 것?</h2>
        <p className="pb-[10px]">
          자율성, 독립성, 경험으로부터의 배움
        </p>

        <h2>개인적인 관심사?</h2>
        <p className="pb-[10px]">
          Generative Design, Ethereum, 메카닉물 애니메이션과
          게임들, 여러 장르음악
        </p>

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
