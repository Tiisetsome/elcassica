import styled from "styled-components";

const ShopStyles = styled.section`
  width: 80%;
  margin: 6rem auto;
  font-family: BauerBodoniStd-Roman;
  text-transfrom: uppercase;
  position: relative;

  .headers {
    h2,
    p {
      text-align: center;
    }

    h2 {
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
    }

    p {
      margin-bottom: 4rem;
      font-family: Montserrat-Medium;
      font-size: 0.9rem;
      color: var(--primary-grey);
    }
  }

  .shop {
    display: grid;
    grid-template-columns: 11rem 1fr;
    gap: 2rem;
  }

  @media screen and (max-width: 768px) {
    .shop {
      grid-template-columns: 1fr;
      gap: 0rem;
    }

    .headers {
      h2 {
        margin-bottom: 1rem;
        font-size: 1.1rem;
        letter-spacing: 0.4rem;
      }

      p {
        margin-bottom: 3rem;
        font-size: 0.8rem;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .headers {
      h2 {
        font-size: 1.1rem;
      }

      p {
        font-size: 0.8rem;
        line-height: 1.5rem;
      }
    }
  }
`;

export default ShopStyles;
