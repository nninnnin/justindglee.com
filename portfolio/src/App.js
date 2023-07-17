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
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  min-height: 100vh;

  @media only screen and (max-width: 480px) {
    img {
      width: 100%;
      max-height: 300px;
      object-fit: cover;
    }
  }

  @media only screen and (min-width: 481px) {
    max-width: 210mm;

    border-left: 1px solid gainsboro;
    border-right: 1px solid gainsboro;

    section {
      height: 100mm;
      border-top: dashed gainsboro 1px;
      border-bottom: 1px dashed gainsboro;

      display: flex;

      .desc {
        flex: 1;
      }

      h1 {
        padding: 1em;
        padding-bottom: 0;
      }

      p {
        font-size: 16px;
        padding-left: 1em;
      }

      img {
        flex: 1;
        background-color: gainsboro;
        object-fit: cover;
        object-position: center;
        border-left: 1px solid white;
      }
    }
  }
`;

export default App;
