import React, { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

const Shoes = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl8 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".shoes-trigger",
        toggleActions: "restart none none none",
      },
    });

    tl8.from(".shoes-trigger", {
      width: "80%",
      duration: 1.5,
      ease: Power3.easeInOut,
    });
  });

  return (
    <ShoesHero className="shoes-trigger">
      <div className="shoe-hero">
        <h1 className="head-1">Just one sneaker and</h1>
        <h1 className="head-2">Run with it!</h1>
      </div>
    </ShoesHero>
  );
};

const ShoesHero = styled.section`
  padding: 12rem 0rem;
  display: flex;
  align-items: center;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;
  background: url("/assets/home/sneaker.jpg") no-repeat center center/cover;
  color: #fff;
  position: relative;
  z-index: 100;

  &:before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.32);
  }

  .shoe-hero {
    width: 80%;
    height: 14rem;
    margin: auto;
    position: relative;

    .head-1 {
      font-size: 3rem;
      margin-bottom: 4rem;
    }

    .head-2 {
      font-size: 6.5rem;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  @media screen and (max-width: 1024px) {
    height: 100%;
    padding: 10rem 0rem;
    .shoe-hero {
      .head-1 {
        font-size: 2rem;
        margin-top: 1rem;
        margin-bottom: 0rem;
      }

      .head-2 {
        font-size: 4rem;
        position: absolute;
        right: 0;
        bottom: 3rem;
      }
    }
  }

  @media screen and (max-width: 500px) {
    height: 100%;
    padding: 4rem 0rem;
    .shoe-hero {
      .head-1 {
        font-size: 0.9rem;
        margin-top: 3rem;
        margin-bottom: 0rem;
      }

      .head-2 {
        font-size: 1.8rem;
        position: absolute;
        right: 0;
        bottom: 5rem;
      }
    }
  }
`;

export default Shoes;
