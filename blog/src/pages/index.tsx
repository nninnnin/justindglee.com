import React from "react";
import { Link } from "gatsby-link";

import Layout from "@components/Layout";
import "@styles/index.scss";

export default function IndexPage() {
  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1 className="header">FAQ</h1>

        <h2 className="mt-0">누구신가요?</h2>
        <p className="pb-[10px] break-words">
          개발자 이동규입니다. 영어이름이 필요한 경우에는 저스틴이라는 이름을
          사용합니다.
          <br />
          2년차 개발자로서 현재는 프론트엔드 개발자로 구직중입니다.
        </p>

        <h2>어떤 개발자가 되고싶으세요?</h2>
        <p className="pb-[10px] break-words">
          '표현력이 좋은 개발자' 라고 말하면 어떨까요? 개발자의 일은 코드를
          포함해 대부분 글을 읽고 쓰는 일입니다. 그리고 글은 타인(혹은
          컴퓨터)에게 잘 전달되었을 때 의미가 있는 것이라고 할 때 - 좋은
          표현력을 가진 글을 쓰는 사람이 되고 싶어요.
        </p>

        <h2>어떤 회사에서 일하고 싶으신가요?</h2>
        <p className="pb-[10px] break-words">
          기술중심적인 회사에서 일하고 싶습니다. 개발자들이 프로덕트와 함께
          기술적으로 성장할 수 있는 환경을 만들기 위해 노력하는 회사에서 일하고
          싶어요!
        </p>

        <h2>개인적인 관심사?</h2>
        <p className="pb-[10px] break-words">
          뉴진스, Generative Design, Ethereum, 사이버포뮬러.
        </p>

        <p className="flex-1 mt-5 relative min-h-[100px]">
          <a href="mailto:nninnnin7@gmail.com">
            <address className="ml-auto absolute bottom-0 right-0 block bg-red-500 p-5 w-fit rounded-2xl font-medium not-italic">
              이메일 보내기
            </address>
          </a>
        </p>
      </div>
    </Layout>
  );
}
