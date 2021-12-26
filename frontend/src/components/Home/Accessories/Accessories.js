import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

import Buttons from "../../Buttons/Buttons";

const Accessories = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl4 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".details-wrapper",
        toggleActions: "restart none none reverse",
      },
    });

    tl4
      .from(".img-container-one", {
        //transform: `scale(0.8)`,
        x: 100,
        duration: 1,
        ease: Power3.easeInOut,
      })
      .from(
        ".img-container-two",
        {
          //transform: `scale(0.8)`,
          x: -100,
          duration: 1,
          ease: Power3.easeInOut,
        },
        "-=1"
      )
      .from(
        ".motto",
        {
          //transform: `scale(0.8)`,
          opacity: 0,
          y: -10,
          duration: 1,
          ease: Power3.easeInOut,
        },
        "-=0.5"
      )
      .from(
        ".watch-motto",
        {
          //transform: `scale(0.8)`,
          opacity: 0,
          y: -10,
          duration: 1,
          ease: Power3.easeInOut,
        },
        "-=0.5"
      )
      .from(
        ".watch-exp-btn",
        {
          //transform: `scale(0.8)`,
          opacity: 0,
          y: -10,
          duration: 1.5,
          ease: Power3.easeInOut,
        },
        "-=0.5"
      );
  });

  return (
    <AccessoriesCont>
      <div className="details-wrapper">
        <div className="img-container-one"></div>
        <div className="motto">
          <h2>Grab latest accessories to suit your style!</h2>
        </div>
        <div className="accessories-shop">
          <div>
            <p className="watch-motto">A new look for your watch</p>
            <Link to="/accessories-shop/">
              <Buttons outline resize className="watch-exp-btn">
                <span>
                  Shop Now <ArrowForwardIosIcon className="arrow" />
                </span>
              </Buttons>
            </Link>
          </div>
        </div>
        <div className="img-container-two">1</div>
      </div>
    </AccessoriesCont>
  );
};

const AccessoriesCont = styled.section`
  padding: 10rem 0rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/assets/home/accessories-hero.jpg") no-repeat center
    center/cover;
  position: relative;
  z-index: 100;
  text-transform: uppercase;

  &:before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: var(--red-color);
    opacity: 0.52;
    z-index: -1;
  }

  .details-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #fff;
    height: 70%;
    width: 70%;
  }

  .motto {
    padding: 4rem 0rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .motto h2 {
    width: 80%;
    font-family: BauerBodoniStd-Bold;
    line-height: 2.5rem;
    font-size: 1.8rem;
  }

  .accessories-shop {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      padding: 3rem 0rem;
      width: 80%;
    }

    p {
      font-family: Montserrat-Medium !important;
      margin-bottom: 2rem;
      line-height: 2.5rem;
      font-size: 1.6rem;
    }
  }

  .img-container-one {
    background: url("/assets/home/watch-one.jpg") no-repeat center center/cover;
  }

  .img-container-two {
    background: url("/assets/home/watch-two.jpg") no-repeat center center/cover;
  }

  @media screen and (max-width: 1024px) {
    height: 100%;
    padding: 8rem 0rem;
    .details-wrapper {
      width: 70%;
    }

    .motto h2 {
      line-height: 2rem;
      font-size: 1.3rem;
    }

    .accessories-shop {
      p {
        margin-bottom: 1rem;
        line-height: 2rem;
        font-size: 1rem;
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    height: 100%;
    padding: 5rem 0rem;
    .details-wrapper {
      width: 80%;
    }

    .motto {
      width: none;
    }

    .motto h2 {
      line-height: 1.4rem;
      font-size: 0.6rem;
      width: 100%;
      padding: 0rem 0.5rem;
    }

    .accessories-shop {
      p {
        margin-bottom: 1rem;
        line-height: 1.4rem;
        font-size: 0.6rem;
      }
    }

    .watch-exp-btn {
      display: flex;
      align-items: center;
      width: 5rem;
      font-size: 0.5rem;
      padding: 0.5rem 0rem;
    }

    .arrow {
      margin-left: 0.5rem;
      font-size: 0.5rem;
    }
  }
`;

export default Accessories;
