import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import ReactMarkdown from "react-markdown";

import resumePath from "./data/resume.md";

function App() {
  const [resume, setResume] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(resumePath);
      console.log(res);
      const result = await res.text();

      setResume(result);
    })();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>작업물 열람</Header>
        <ReactMarkdown>{resume}</ReactMarkdown>
      </Container>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    /* background-color: orangered; */
    background-color: #fff;
    /* color: white; */
    font-family: "Spoqa Han Sans Neo", "sans-serif";
    font-weight: 300;
    font-size: 0.8rem;
  }

  h1 {
    margin: 0;
    padding: 1em;
    padding-bottom: 0;
  }

  ul, ol, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    padding-left: 1em;
  }

  p {
    padding-left: 1em;
    line-height: 1.5em;
    word-break: keep-all;

    &::first-line {
      line-height: 3em;
      font-size: 1.5em;
    }
  }

  img {
    width: 300px;
    margin: 1em;
  }

  hr {
    background-color: gainsboro;
    border: none;
    height: 1px;
  }
`;

const Container = styled.div`
  background-color: white;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  min-height: 100vh;

  padding-bottom: 3em;
`;

const Header = styled.h1`
  letter-spacing: 9px;
`;

export default App;
