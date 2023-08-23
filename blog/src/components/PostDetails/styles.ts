import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 2.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export const H2 = styled.h2`
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export const H3 = styled.h3.withConfig({
  shouldForwardProp: (prop) => !["node", "level"].includes(prop),
})`
  font-size: 1.2em;
  margin-bottom: 0.5em;
`;

export const Image = styled.img.withConfig({
  shouldForwardProp: (prop) => !["node"].includes(prop),
})`
  width: 50%;
  border: 1px solid gainsboro;
  background-color: #fff;

  display: block;
  margin: 2em auto;
`;

export const HR = styled.hr.withConfig({
  shouldForwardProp: (prop) => !["node"].includes(prop),
})`
  margin: 2em 0;
`;

export const UL = styled.ul.withConfig({
  shouldForwardProp: (prop) => !["ordered"].includes(prop),
})`
  padding-left: 1.3rem;
  list-style-type: disc;

  & > li {
    margin-top: 4px;
  }
`;

export const FrameWrapper = styled.div<{ ratio: number }>`
  width: 100%;
  background-color: #fff;
  padding-top: ${({ ratio }) => `${ratio}%`};
  margin-bottom: 1.5em;

  position: relative;
`;

export const Frame = styled.iframe.withConfig({
  shouldForwardProp: (prop) => !["node"].includes(prop),
})<{ ratio: number }>`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: block;

  position: absolute;
  top: 0;
  left: 0;
`;

export const Anchor = styled.a.withConfig({
  shouldForwardProp: (prop) => !["node"].includes(prop),
})`
  text-decoration: underline;
`;
