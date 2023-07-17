import styled from "styled-components";
import React from "react";

const Header = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.h1`
  letter-spacing: 9px;

  padding: 2em;
  padding-left: 1em;

  @media only screen and (max-width: 480px) {
    padding-left: 0;
  }
`;

export default Header;
