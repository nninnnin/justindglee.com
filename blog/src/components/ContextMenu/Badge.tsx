import React from "react";
import clsx from "clsx";
import styled from "styled-components";
import removeButtonSource from "@icons/cross.png";

interface Props {
  children: React.ReactNode;
  removable?: boolean;
}

const Badge = ({ children, removable = true }: Props) => {
  return (
    <Container>
      {children}

      {removable && (
        <img
          className={clsx(
            "!shadow-none mr-[-0.2em]",
            "hover:bg-slate-100",
            "select-none cursor-pointer"
          )}
          src={removeButtonSource}
          width={16}
          height={16}
          onClick={() => {
            // 해당 포스트에서 태그 제거
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 0.2em;
  padding: 0.05em 0.35em;
  padding-right: 0.4em;

  border-radius: 3px;
  width: fit-content;

  display: flex;
  align-items: center;

  color: black;
  background-color: #ececec;
  text-shadow: none;
  font-size: 0.8rem;
  white-space: nowrap;
`;

export default Badge;
