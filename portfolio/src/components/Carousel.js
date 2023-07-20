import styled from "styled-components";
import React from "react";
import useMapIds from "../hooks/useMapIds.ts";

const Carousel = ({ images }) => {
  const imagesWithKey = useMapIds(images);

  return (
    <Container>
      {imagesWithKey.map((image) => (
        <ImageWrapper key={image.id}>
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

  position: relative;
  display: flex;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  min-width: 100%;

  img {
    width: 100%;
    height: 100%;
    max-height: 300px;
    min-height: 100%;
    object-fit: contain;
  }
`;

export default Carousel;
