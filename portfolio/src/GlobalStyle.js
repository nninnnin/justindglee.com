import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-Light';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Light.woff') format('woff');
    /* font-weight: 400; */
    font-style: normal;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Pretendard-Light", "sans-serif";
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
    font-family: "Pretendard-Light", "sans-serif";
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
    max-height: 300px;
    object-fit: cover;
    object-position: center;
  }

  hr {
    background-color: transparent;
    border: none;
    height: 1.8em;
  }
`;
