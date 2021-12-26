import styled from "styled-components";

export const ProductFormStyles = styled.div`
  background-color: var(--light-grey-extra);
  width: 100%;
  margin-bottom: 2rem;

  h3 {
    margin: 2rem;
    text-align: center;
    font-size: 0.85rem;
  }

  form {
    width: 70%;
    margin: auto;

    div {
      margin-bottom: 1rem;
      font-size: 0.75rem;
      font-family: Montserrat-Regular;

      label {
        display: block;
        margin-bottom: 1rem;
      }

      .variations-wrapper {
        gap: 0.5rem;
        span {
          padding: 0.3rem 0.5rem;
          border-radius: 5px;
          font-size: 0.6rem;
          background-color: var(--light-blue-color);
          font-family: Montserrat-Semibold;
          color: #fff;
        }
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: 0.3rem;
        background-color: inherit;
        border: 1px #d6d6d6 solid;
        border-radius: 4px;
        outline: none;
        color: var(--grey-color);
        font-size: 0.75rem;
        font-family: Montserrat-Regular;
      }

      textarea {
        height: 6rem;
      }

      button,
      .button {
        width: 8rem;
        padding: 0.5rem 0rem;
        margin-bottom: 1rem;
        outline: none;
        border: none;
        color: #fff;
        background-color: var(--light-blue-color);
        text-align: center;
      }

      .button {
        font-size: 0.8rem;
        border-radius: 3px;
      }
    }

    .error {
      display: flex;
      gap: 1rem;
      align-items: center;
      grid-column: 1 / span 2;
      padding: 0.5rem 0.8rem;
      margin-bottom: 1rem;
      border-left: 5px rgb(172, 68, 68) solid;
      background-color: rgb(255, 172, 172);

      span {
        font-family: Montserrat-Medium;
        text-transform: uppercase;
      }
    }
  }
`;
