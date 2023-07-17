import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import Resume from "./components/Resume";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>작업물 열람</Header>
        <Resume />
        <Footer />
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: white;
  width: 90%;
  max-width: 100%;
  min-height: 100vh;

  margin: 0 auto;

  @media only screen and (max-width: 480px) {
    height: 100svh;
    overflow: auto;
    scroll-snap-type: y mandatory;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @media only screen and (min-width: 481px) {
    max-width: 210mm;

    border-left: 1px solid gainsboro;
    border-right: 1px solid gainsboro;
  }
`;

export default App;
