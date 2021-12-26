import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PorductNew = ({ product }) => {
  const scrollToTop = () => {
    window.scroll(0, 0);
  };
  return (
    <Link to={`/product/${product._id}`}>
      <SingleProductStyles>
        <img src={product.imageUrl} alt="new-suit" onClick={scrollToTop}></img>
      </SingleProductStyles>
    </Link>
  );
};

const SingleProductStyles = styled.div`
  border: 1px #e3e3e3 solid;
  width: 100%;
  margin: auto;
  height: 16rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  object-fit: cover;
  overflow: hidden;
  img {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding: 2.2rem;
    height: 12rem;
  }

  @media screen and (max-width: 500px) {
    padding: 0.3rem;
    height: 6rem;
  }
`;

export default PorductNew;
