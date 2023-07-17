import styled from "styled-components";
import React from "react";

const Footer = () => {
  return (
    <Container>
      <Contact>
        <span>작업 관련 문의</span>
        <span>
          <label>이메일:</label> nninnnin7@gmail.com
        </span>
        <span>
          <label>인스타그램:</label> @justindglee
        </span>
      </Contact>
    </Container>
  );
};

const Container = styled.footer`
  height: 5cm;

  position: relative;

  display: grid;
  place-items: center;

  scroll-snap-align: end;
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  place-self: center right;
  align-items: flex-end;

  span {
    margin-right: 2mm;
    padding: 1mm;

    label {
      min-width: 300px;
    }
  }
`;

export default Footer;
