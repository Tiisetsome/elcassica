import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'

import Buttons from "../../Buttons/Buttons";
// import "./Hero.css";

const Hero = () => {
  return (
    <HeroStyles>
      <div className="hero-wrapper">
        <h1>
          Rock the swag <span>this summer with elcassica</span>
        </h1>
        <Link to="/men-shop">
          <Buttons>Shop Now</Buttons>
        </Link>
        <Link to="/sale">
          <Buttons secondary>50% off sale</Buttons>
        </Link>
      </div>
    </HeroStyles>
  );
};

const HeroStyles = styled.header`
  background: url("/assets/home/hero_img.jpg") no-repeat center center/cover;
  color: #fff;
  position: relative;
  z-index: 100;

  ::before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.62);
    z-index: -1;
  }

  .hero-wrapper {
    max-width: 80%;
    margin: auto;
    padding: 10rem 0rem;
    z-index: 1;
  }

  h1 {
    font-size: 6.5rem;
    letter-spacing: 0.8rem;
    width: 100%;
    padding-bottom: 1rem;
    text-transform: uppercase;
    margin-bottom: 4rem;
    font-family: "BauerBodoniStd-Bold";
  }

  span {
    display: block;
    margin-top: 2rem;
    font-size: 2rem;
    letter-spacing: 0.7rem;
  }

  @media screen and (max-width: 1024px) {
    h1 {
      font-size: 3rem;
      letter-spacing: 0.5rem;
      padding-bottom: 0.8rem;
      margin-bottom: 2rem;
    }

    .hero-wrapper {
      padding: 7rem 0rem;
    }

    span {
      margin-top: 2rem;
      font-size: 1rem;
      letter-spacing: 0.5rem;
    }
  }

  @media screen and (max-width: 500px) {
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    span {
      margin-top: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export default Hero;
