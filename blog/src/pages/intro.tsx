import React from "react";
import { shuffle } from "lodash";

import Layout from "@components/Layout";
import "@styles/index.scss";
import Button from "@components/common/Button";
import Navigation from "@components/Navigation";
import ListItem from "@components/ContentsList/ListItem";

const greetings = [".."];

function pickGreeting(greetings: Array<string>): string {
  return shuffle(greetings)[0];
}

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <p className="mb-auto">
          <About.Greeting2 />
        </p>

        <hr className="mt-3" />

        <p className="mt-5 relative justify-end sm:justify-between items-center hidden sm:flex">
          <ListItem.Tag name="© 2023-2024. 이동규 블로그" />

          <div className="flex">
            {/* <a href="https://justindglee.netlify.com">
              Projects
            </a>

            <Navigation.ItemSeperator /> */}

            <a href="https://www.linkedin.com/in/justindglee/">
              Careers
            </a>

            <Navigation.ItemSeperator />

            <a href="mailto:nninnnin7@gmail.com">
              Email to
            </a>
          </div>
        </p>
      </div>
    </Layout>
  );
}

About.Greeting1 = () => (
  <>
    이렇게 먼 곳까지 찾아와주셔서 감사합니다. <br />
    <br />
    멋진 말들을 써두고싶은데 어떤 이야기를 해야할지 잘
    모르겠네요.
    <br />
    어떻든 제가 관심있는 내용들에 대해 함께 관심을
    기울여주셔서 기쁜 마음이 듭니다.
    <br />
    <br />
    그 간에는 블로그를 마치 취업에 필요한 포트폴리오처럼
    생각했었는데요, <br />
    앞으로는 조금은 개인적인 관심사들도 올려볼까 싶습니다.
    <br />
    <br />
    즐거우셨다면 또 와주세요. 꾸준히 업데이트 하겠습니다.
    <br />
    <br />
    2024년 새해 복 많이 받으세요.
    <br />
    <br />
  </>
);

About.Greeting2 = () => (
  <>
    <h2 className="header !pb-0 mt-0">3월의 인사</h2>
    호이호이..
    <br />
    벌써 3월이라니. 시간이 빠르네요
    <br />
    <br />
    하루하루 목표한 바에 가까워지고 계신가요?
    <br />
    아무쪼록 건강하시고 행복하시길 바랍니다.
    <br />
    <br />
    God bless you and me..
  </>
);
