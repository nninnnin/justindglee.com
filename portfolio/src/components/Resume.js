import React from "react";
import Carousel from "./Carousel";

const Resume = () => {
  return (
    <div>
      <section>
        <div class="desc">
          <h1>찹스틱스 소비자 플랫폼</h1>
          <p>
            찹스틱스의 소비자 플랫폼의 클라이언트를 개발하였습니다. 판매자
            플랫폼을 통해 등록된 상품의 내용을 확인, 카트에 담고 주문할 수
            있습니다. TypeScript와 Next.js 그리고 React Query(GraphQL)를
            사용하였습니다.
          </p>
        </div>
        <img alt="portal2" src="/chopsticks-consumer.gif" />
      </section>

      <hr />

      <section>
        <div class="desc">
          <h1>찹스틱스 판매자 플랫폼</h1>
          <p>
            찹스틱스의 판매자 플랫폼의 클라이언트를 개발하였습니다. 판매자로
            승인된 샵의 정보를 등록하고, 해당 샵의 상품들을 등록할 수 있습니다.
            TypeScript와 React 그리고 Apollo Client(GraphQL)를 사용하였습니다.
          </p>
        </div>
        <img
          alt="portal2"
          src="/chopsticks-seller.gif"
          style={{
            objectPosition: "left top",
          }}
        />
      </section>

      <hr />

      <section>
        <div class="desc">
          <h1>바닐라코딩 포털 서비스</h1>
          <p>
            바닐라코딩 포털 서비스를 기획, 디자인 및 개발하였습니다. 코스
            신청서를 작성, 결제하고 코스 컨텐츠를 확인할 수 있습니다. Next.js를
            사용하여 개발하였습니다.
          </p>
        </div>
        <Carousel
          images={[
            {
              alt: "portal1",
              src: "/portal-1.png",
            },
            {
              alt: "portal2",
              src: "/portal-2.gif",
            },
          ]}
        />
      </section>

      <hr />

      <section>
        <div class="desc">
          <h1>바닐라코딩 앱</h1>
          <p>
            퍼즐앱을 개발하였습니다. 자료구조 개념을 사용하여 알파벳 순서를
            맞추는 게임을 할 수 있습니다. Expo가 아닌 순수 React Native와
            TypeScript를 사용하였고, 전역 상태관리와 서버 데이터 가져오기에는
            Apollo client(GraphQL)를 사용했습니다.
          </p>
        </div>
        <Carousel
          images={[
            {
              alt: "rn1",
              src: "/rn-1.png",
            },
            {
              alt: "rn2",
              src: "/rn-2.png",
            },
          ]}
        />
      </section>

      <hr />

      <section>
        <div class="desc">
          <h1>복주머니 모바일 웹</h1>
          <p>
            설날에 사용될 수 있는 복주머니 모바일 웹을 개발했습니다. 복주머니에
            메시지를 담아 상대방의 방에 두고 올 수 있습니다. React(CRA)를
            사용하였고, 전역 상태관리에는 Context API를 사용하였습니다.
          </p>
        </div>
        <img
          alt="bok1"
          src="/bok-1.png"
          style={{
            objectFit: "contain",
          }}
        />
      </section>

      <hr />

      <section>
        <div class="desc">
          <h1>피크닉 정원만들기 전시</h1>
          <p>
            키오스크 전시공간 피크닉의 전시 "정원만들기" 에 사용될 키오스크를
            개발하였습니다. JavaScript를 사용하였으며, 드래그 앤 드롭 등의
            기능을 외부 라이브러리 의존없이 모두 직접 개발하였습니다.
          </p>
        </div>
        <img alt="piet1" src="/piet-1.gif" />
      </section>

      <hr />

      <section>
        <div class="desc">
          <h1>피크닉 사울레이터 전시</h1>
          <p>
            이미지 슬라이더 전시공간 피크닉의 전시 "창문을 통해 어렴풋이" 에
            사용될 키오스크를 개발하였습니다. 인스타그램 링크로 이미지를 가져와
            슬라이더로 표현합니다. CORS 이슈를 해결하기 위해 proxy server를
            개발하였습니다.
          </p>
        </div>
        <img alt="saul1" src="/saul-1.gif" />
      </section>
    </div>
  );
};

export default Resume;
