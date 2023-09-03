import React from "react";
import { shuffle } from "lodash";

import Layout from "@components/Layout";
import "@styles/index.scss";

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
          개발자 이동규입니다. 영어이름이 필요한 경우에는
          저스틴이라는 이름을 사용합니다.
        </p>

        <h2>간단한 이력</h2>
        <ul className="list-disc pl-5">
          <li>단국대학교 국제경영학과 졸업</li>
          <li>캐롯손해보험 인턴</li>
          <li>바닐라코딩 교육/개발</li>
          <li>찹스틱스 프론트엔드 개발</li>
          <li>적극적으로 구직중 (현재)</li>
        </ul>

        <h2>중요하게 생각하는 것?</h2>
        <p className="pb-[10px]">
          자율성, 독립성, 경험으로부터의 배움.
        </p>

        <h2>개인적인 관심사?</h2>
        <p className="pb-[10px]">
          뉴진스, Generative Design, Ethereum, 사이버포뮬러.
        </p>

        <p className="flex-1 mt-5 relative min-h-[100px] flex items-end justify-end">
          <a
            className="glassmorph-listitem py-4 px-5 w-fit rounded-md font-medium not-italic"
            href="https://github.com/nninnnin"
          >
            깃허브 구경하기
          </a>

          <a
            className="glassmorph-listitem ml-4 py-4 px-5 w-fit rounded-md font-medium not-italic"
            href="mailto:nninnnin7@gmail.com"
          >
            이메일 보내기
          </a>
        </p>
      </div>
    </Layout>
  );
}
