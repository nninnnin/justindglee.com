import React from "react";

import Layout from "@components/Layout";
import "@styles/index.scss";
import Navigation from "@components/Navigation";
import ListItem from "@components/ContentsList/ListItem";
import Greetings from "@components/greetings";

export default function IntroPage() {
  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <IntroPage.Contents>
          <Greetings />

          <IntroPage.ContentsDivider />

          <IntroPage.Interests />
        </IntroPage.Contents>

        <IntroPage.Footer />
      </div>
    </Layout>
  );
}

IntroPage.Contents = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="mb-[30vh]">{children}</div>;
};

IntroPage.Footer = () => {
  return (
    <div
      style={{
        textShadow: "none",
        color: "rgba(255, 255, 255, 0.8) !important",
        fontSize: "0.8em",
        whiteSpace: "nowrap",
      }}
    >
      <hr className="my-5 opacity-[0.2]" />

      <p className="relative justify-end sm:justify-between items-center hidden sm:flex">
        <span>© 2023-2024. 이동규 블로그</span>

        <div className="flex">
          {/* <a href="https://justindglee.netlify.com">
      Projects
    </a>

    <Navigation.ItemSeperator /> */}

          <a href="https://www.linkedin.com/in/justindglee/">
            Careers
          </a>

          <Navigation.ItemSeperator />

          <a href="mailto:nninnnin7@gmail.com">Email to</a>
        </div>
      </p>
    </div>
  );
};

IntroPage.ContentsDivider = () => {
  return <hr className="my-8 opacity-[0.2]" />;
};

IntroPage.Interests = () => {
  return (
    <div>
      <h2>요즘의 관심사들</h2>
      <ul className="space-y-1 list-disc ml-[1.5em]">
        <li>postMessage with Iframes</li>
        <li>Flocking algorithm</li>
      </ul>
    </div>
  );
};
