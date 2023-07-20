import styled, { css } from "styled-components";
import React from "react";
import Carousel from "./Carousel.js";
import TechStack from "./TechStack.tsx";

import ChopsticksConsumerGif from "../images/chopsticks-consumer.gif";
// import ChopsticksSellerGif from "../images/chopsticks-seller.gif";
import ChopsticksSellerWebM from "../images/chopsticks-seller.webm";
import ChopsticksSellerMP4 from "../images/chopsticks-seller.mp4";

const Resume = () => {
  return (
    <div>
      <Section>
        <div className="desc">
          <h1>찹스틱스 소비자 플랫폼</h1>
          <p>
            찹스틱스의 소비자 플랫폼의 클라이언트를 개발하였습니다. 판매자
            플랫폼을 통해 등록된 상품의 내용을 확인, 카트에 담고 주문할 수
            있습니다. <br />
            <a href="https://chopsticks.market">여기</a>에서 운영중인 서비스를
            확인할 수 있습니다.
          </p>

          <TechStack
            stacks={[
              {
                name: "TypeScript",
                icon: "typescript",
              },
              {
                name: "Next.js",
                icon: "nextjs",
              },
              {
                name: "Recoil",
                icon: "recoil",
              },
              {
                name: "React Query",
                icon: "reactquery",
              },
              {
                name: "GraphQL",
                icon: "graphql",
              },
              {
                name: "아임포트(포트원)",
                icon: "portone",
              },
            ]}
          />
        </div>

        <Image alt="chopsticks-consumer" src={ChopsticksConsumerGif} />
      </Section>

      <hr />

      <Section>
        <div className="desc">
          <h1>찹스틱스 판매자 플랫폼</h1>
          <p>
            찹스틱스의 판매자 플랫폼의 클라이언트를 개발하였습니다. 판매자로
            승인된 샵의 정보를 등록하고, 해당 샵의 상품들을 등록할 수 있습니다.
          </p>

          <TechStack
            stacks={[
              {
                name: "TypeScript",
                icon: "typescript",
              },
              {
                name: "Apollo Client",
                icon: "apollo",
              },
              {
                name: "GraphQL",
                icon: "graphql",
              },
              {
                name: "React hook form",
                icon: "hookform",
              },
            ]}
          />
        </div>

        {/* <Image src={ChopsticksSellerGif} /> */}
        <Video autoPlay loop muted playsInline>
          <source src={ChopsticksSellerWebM} type="video/webm" />
          <source src={ChopsticksSellerMP4} type="video/mp4" />
        </Video>
      </Section>

      <hr />

      <Section>
        <div className="desc">
          <h1>바닐라코딩 포털 서비스</h1>
          <p>
            바닐라코딩 포털 서비스를 기획, 디자인 및 개발하였습니다. 코스
            신청서를 작성, 결제하고 코스 컨텐츠를 확인할 수 있습니다.
          </p>
          <TechStack
            stacks={[
              {
                name: "Figma",
                icon: "typescript",
              },
              {
                name: "Next.js",
                icon: "nextjs",
              },
              {
                name: "아임포트(포트원)",
                icon: "portone",
              },
            ]}
          />
        </div>
        <Carousel
          images={[
            {
              alt: "portal1",
              src: "/portal-1.png",
            },
            // {
            //   alt: "portal2",
            //   src: "/portal-2.gif",
            // },
          ]}
        />
      </Section>

      <hr />

      <Section>
        <div className="desc">
          <h1>바닐라코딩 앱</h1>
          <p>
            퍼즐앱을 개발하였습니다. 자료구조 개념을 사용하여 알파벳 순서를
            맞추는 게임을 할 수 있습니다.
            <br />
            <br />
            <a href="https://play.google.com/store/apps/details?id=com.crowd.wordie&pli=1">
              여기
            </a>
            에서 플레이스토어에 배포된 앱을 확인할 수 있습니다.
          </p>
          <TechStack
            stacks={[
              {
                name: "React Native",
                icon: "react",
              },
              {
                name: "TypeScript",
                icon: "typescript",
              },
              {
                name: "GraphQL",
                icon: "graphql",
              },
            ]}
          />
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
      </Section>

      <hr />

      <Section>
        <div className="desc">
          <h1>복주머니 모바일 웹</h1>
          <p>
            설날에 사용될 수 있는 복주머니 모바일 웹을 개발했습니다. 복주머니에
            메시지를 담아 상대방의 방에 두고 올 수 있습니다.
          </p>
          <TechStack
            stacks={[
              {
                name: "React",
                icon: "react",
              },
              {
                name: "React Router",
                icon: "reactrouter",
              },
            ]}
          />
        </div>
        <Image
          alt="bok1"
          src="/bok-1.png"
          style={{
            objectFit: "contain",
          }}
        />
      </Section>

      <hr />

      <Section>
        <div className="desc">
          <h1>피크닉 정원만들기 전시</h1>
          <p>
            키오스크 전시공간 피크닉의 전시 "정원만들기" 에 사용될 키오스크를
            개발하였습니다. 드래그 앤 드롭 등의 기능을 라이브러리 의존없이 직접
            구현하였습니다.
            <br />
            <br />
            <a href="https://piknic-piet-oudolf.netlify.app/">여기</a>에서
            배포된 내용을 확인할 수 있습니다.
          </p>
          <TechStack
            stacks={[
              {
                name: "JavaScript",
                icon: "javascript",
              },
              {
                name: "Netlify",
                icon: "netlify",
              },
            ]}
          />
        </div>
        <Image alt="piet1" src="/piet-1.gif" />
      </Section>

      <hr />

      <Section>
        <div className="desc">
          <h1>피크닉 사울레이터 전시</h1>
          <p>
            이미지 슬라이더 전시공간 피크닉의 전시 "창문을 통해 어렴풋이" 에
            사용될 키오스크를 개발하였습니다. 인스타그램 링크로 이미지를 가져와
            슬라이더로 표현합니다.
          </p>
          <TechStack
            stacks={[
              {
                name: "JavaScript",
                icon: "javascript",
              },
              {
                name: "Node.js",
                icon: "nodejs",
              },
              {
                name: "Heroku",
                icon: "heroku",
              },
            ]}
          />
        </div>

        <Image alt="saul1" src="/saul-1.gif" />
      </Section>
    </div>
  );
};

const Section = styled.div`
  h1 {
    font-size: 1.2em;
    margin-top: 1em;
  }

  @media only screen and (max-width: 480px) {
    height: 100svh;
    margin-top: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;

    scroll-snap-align: start;

    .desc {
      font-size: 1.3em;
    }

    img,
    video {
      max-height: 40svh;
    }

    &:first-child {
      padding-top: 0;
      scroll-snap-align: unset;
      height: calc(100svh - 82.19px);
    }
  }

  @media only screen and (min-width: 481px) {
    border-top: dashed gainsboro 1px;
    border-bottom: 1px dashed gainsboro;

    display: flex;

    .desc {
      flex: 1;
      font-size: 16px;
      padding-left: 1em;
      padding-right: 0.5em;

      display: flex;
      flex-direction: column;
    }

    h1 {
      font-size: 1.1em;
    }
  }
`;

const mediaStyle = css`
  width: 100%;

  @media only screen and (min-width: 481px) {
    flex: 1;
    width: 300px;
  }
`;

const Image = styled.img`
  ${mediaStyle}
`;

const Video = styled.video`
  ${mediaStyle}
  object-fit: cover;
`;

export default Resume;
