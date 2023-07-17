import styled from "styled-components";
import React from "react";

const Carousel = ({ images }) => {
  return (
    <Container>
      {images.map((image) => (
        <Image>
          <img alt={image.alt} src={image.src} />
        </Image>
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  position: relative;
  display: flex;
  overflow: hidden;
`;

const Image = styled.div`
  min-width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default Carousel;
