import styled from "styled-components";

const ProductNewStyles = styled.section`
  margin-bottom: 5rem;
  .new_stock {
    position: relative;
    .stock-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      position: relative;
      width: 90%;
      margin: auto;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 6rem;
    font-family: BauerBodoniStd-Roman;
    text-transform: uppercase;
  }

  @media screen and (max-width: 768px) {
    .new_stock {
      position: relative;
      .stock-container {
        gap: 1rem;
      }
    }

    h2 {
      font-size: 1.1rem;
      letter-spacing: 0.4rem;
    }
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 0rem;

    h2 {
      font-size: 1.5rem;
      letter-spacing: 0rem;
      line-height: 2.5rem;
      margin: 5rem 0rem 3rem 0rem;
    }

    .left {
      color: red !important;
    }
  }
`;

export default ProductNewStyles;
