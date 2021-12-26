import styled from "styled-components";

export const StatusNotifierStyles = styled.div`
  gap: 2rem;

  .note {
    gap: 1rem;
    div {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background-color: var(--pink-color);
    }

    span {
      font-family: Montserrat-Regular;
      font-size: 0.72rem;
      color: var(--grey-color);
    }
  }
`;
