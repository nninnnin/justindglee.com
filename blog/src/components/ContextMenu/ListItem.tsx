import styled from "styled-components";

const ListItem = styled.li`
  display: flex;

  border-radius: 4px;

  font-size: 0.8rem;
  white-space: nowrap;
  text-shadow: none;
  color: #525252;

  transition: 0.1s;

  &:last-child {
    border-bottom: 0;
  }
`;

export default ListItem;
