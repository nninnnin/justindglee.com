import React from "react";
import { shuffle } from "lodash";

import Layout from "@components/Layout";
import "@styles/index.scss";
import Button from "@components/common/Button";

const greetings = [".."];

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

        <p className="pb-[10px]">
          안녕하세요, 이렇게 먼 곳까지 찾아와주셔서
          감사합니다. <br />
          <br />
          멋진 말들을 써두고싶은데 어떤 이야기를 해야할지 잘
          모르겠네요.
          <br />
          아무쪼록 제가 관심있는 내용들에 대해 함께 관심을
          가져주셔서 감사합니다.
          <br />
          <br />
          그 간에는 블로그를 마치 취업에 필요한
          포트폴리오처럼 생각했었는데요, <br />
          앞으로는 조금은 개인적인 관심사들도 올려볼까
          싶습니다.
          <br />
          <br />
          작은 방명록을 마련하게 된다면 인사 한마디씩
          부탁드려요.
          <br />
          즐거우셨다면 또 와주세요. 꾸준히 업데이트
          하겠습니다.
          <br />
          <br />
          2024년 1월 1일 이동규 드림
        </p>

        <p className="flex-1 mt-5 relative min-h-[100px] flex items-end justify-end">
          <a href="https://justindglee.netlify.com">
            <Button.Item>작업물 구경하기</Button.Item>
          </a>

          <a href="mailto:nninnnin7@gmail.com">
            <Button.Item>이메일 보내기</Button.Item>
          </a>
        </p>
      </div>
    </Layout>
  );
}
