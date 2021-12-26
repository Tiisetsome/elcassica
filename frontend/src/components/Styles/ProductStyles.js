import styled from "styled-components";

const ProductStyles = styled.section`
  padding: 0rem 0rem 0rem 0rem;
  margin: 0rem auto;

  h2 {
    margin-bottom: 3rem;
    color: black;
    font-family: BauerBodoniStd-Roman;
  }
  .products-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 8rem;

    .product {
      .image-container {
        background-image: linear-gradient(#aaaaaa, #e3e3e3);
        width: 100%;
        height: 320px;
        padding: 3rem 2rem;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .product-price {
        margin: 1rem 0rem;
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;

        h4 {
          font-size: 0.8rem;
        }

        p {
          font-size: 0.9rem;
          color: var(--primary-grey);
        }
      }

      .options {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: Montserrat-Medium;
        color: var(--primary-grey);
        text-transform: uppercase;

        p {
          font-size: 0.7rem;
        }
      }

      ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0rem;
        font-size: 0.6rem;

        li {
          position: relative;
          display: flex;
          gap: 0.5rem;
          text-transform: uppercase;
        }

        .color {
          margin-top: 0.1rem;
          margin-left: 0.5rem;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: inherit;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .products-wrapper {
      gap: 1rem;

      .product {
        ul {
          flex-wrap: wrap;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    .products-wrapper {
      grid-template-columns: repeat(2, 1fr);

      .product {
        .image-container {
          height: 250px;
          padding: 2rem 1rem;
        }
        li:not(:first-child) {
          display: none;
        }
      }
    }
  }
`;

export default ProductStyles;
