import styled from "styled-components";
import React from "react";

const Carousel = ({ images }) => {
  return (
    <Container>
      {images.map((image) => (
        <ImageWrapper>
          <img alt={image.alt} src={image.src} />
        </ImageWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  @media only screen and (max-width: 480px) {
    max-height: 40svh;
  }

  background-color: violet;
  position: relative;
  display: flex;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  min-width: 100%;

  background-color: red;

  img {
    width: 100%;
    min-height: 100%;
  }
`;

export default Carousel;
