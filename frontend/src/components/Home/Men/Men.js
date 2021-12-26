import React, { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

const Men = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = new gsap.timeline({
      scrollTrigger: {
        trigger: ".men-section",
        toggleActions: "restart none none reverse",
        start: "top 50%",
      },
    });

    tl.to(".men-section", {
      width: "100%",
      opacity: 1,
      duration: 2,
      ease: Power3.easeOut,
    });
  }, []);

  return (
    <MenHero className="shadow men-section">
      <div className="wrapper">
        <div className="men-hero">
          <h1 className="mini-head">Step Out With A</h1>
          <h1>New Look!</h1>
        </div>
      </div>
    </MenHero>
  );
};

const MenHero = styled.section`
  padding: 20rem 0rem;
  width: 80%;
  opacity: 1;
  background: url("/assets/home/man-step-out.jpg") no-repeat center center/cover;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;
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
    background-color: rgba(0, 0, 0, 0.62);
    z-index: -1;
  }

  .wrapper {
    width: 80%;
    margin: auto;
    position: relative;
    height: 100%;
  }

  .men-hero {
    position: absolute;
    display: inline-block;
    right: 0rem;
    top: 40%;
  }

  h1 {
    font-size: 6.5rem;
    margin-left: 3rem;
  }

  .mini-head {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    margin-left: 0rem;
  }

  @media screen and (max-width: 1024px) {
    height: 100%;
    padding: 15rem 0rem;
    .men-hero {
      top: 40%;
    }

    h1 {
      font-size: 4rem;
      margin-left: 3rem;
    }

    .mini-head {
      font-size: 1.5rem;
      margin-left: 1rem;
    }
  }

  @media screen and (max-width: 500px) {
    height: 100%;
    padding: 10rem 0rem;

    .men-hero {
      position: absolute;
      display: inline-block;
      right: 0rem;
      top: 0%;
    }

    h1 {
      font-size: 2rem;
      margin-left: 2rem;
    }

    .mini-head {
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }
`;

export default Men;
