import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Pretendard", "sans-serif";
    font-weight: 300;
    font-size: 0.8rem;
    
    @media only screen and (max-width: 480px) {
      height: 100svh;
      overflow: hidden;
    }
  }

  h1 {
    margin: 0;
    font-weight: 400;
    font-family: "Pretendard", "sans-serif";
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
    line-height: 1.5em;
    word-break: keep-all;
  }

  img {
    height: 300px;
    object-fit: contain;
    object-position: center;
  }

  hr {
    background-color: transparent;
    border: none;
    height: 1.8em;
  }
`;
