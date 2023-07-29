import React from "react";

import Layout from "@components/Layout";
import "@styles/index.scss";

export default function About() {
  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1 className="header">소개를 위한 문답</h1>

        <h2 className="mt-0">누구시죠?</h2>
        <p className="pb-[10px]">
          개발자 이동규입니다. 영어이름이 필요한 경우에는 저스틴이라는 이름을
          사용합니다.
        </p>

        <h2>중요하게 생각하는 것들?</h2>
        <p className="pb-[10px]">자율성, 독립성, 경험으로부터의 배움.</p>

        <h2>개인적인 관심사?</h2>
        <p className="pb-[10px]">
          뉴진스, Generative Design, Ethereum, 사이버포뮬러.
        </p>

        <p className="flex-1 mt-5 relative min-h-[100px]">
          <a
            className="ml-auto absolute bottom-0 right-0 block bg-blue-600 py-4 px-5 w-fit rounded-md font-medium not-italic"
            href="mailto:nninnnin7@gmail.com"
          >
            이메일 보내기
          </a>
        </p>
      </div>
    </Layout>
  );
}
