import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

import Buttons from "../../Buttons/Buttons";

const MenSuitShop = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl6 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".men-shop-trigger",
        toggleActions: "restart none none reverse",
      },
    });

    tl6

      .from(".men-suit", {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: Power3.easeOut,
      })
      .from(
        ".men-suit-details h2",
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=1.2"
      )
      .from(
        ".men-suit-details p",
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      )
      .from(
        ".men-suit-details Button",
        {
          //y: 40,
          opacity: 0,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.4"
      );
  });

  return (
    <SuitSection className="men-shop-trigger">
      <div className="men-suit shadow"></div>
      <div className="men-suit-shop">
        <div className="men-suit-details">
          <h2>
            Revamp Your Wardrobe by adding new taste of suits to your
            collection.
          </h2>
          <p>Slim-fit, tuxedo, notch lapel, and more.....</p>
          <Link to="/men-shop">
            <Buttons outline>
              shop now
              <span>
                <ArrowForwardIosIcon className="arrow" />
              </span>
            </Buttons>
          </Link>
        </div>
      </div>
    </SuitSection>
  );
};

const SuitSection = styled.section`
  width: 80%;
  margin: 15rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;

  .men-suit {
    background: url("/assets/home/Men-suit.jpg") no-repeat center center/cover;
    position: relative;
  }

  .men-suit-shop {
    padding: 5rem 0rem;
    display: flex;
    align-items: center;

    h2 {
      font-size: 2.8rem;
      line-height: 4rem;
      margin-bottom: 2rem;
    }

    p {
      font-family: Montserrat-Medium;
      font-size: 1em;
      margin-bottom: 2rem;
      color: var(--primary-grey);
    }
  }

  shodow:before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.32);
  }

  .arrow {
    margin-left: 1rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 1024px) {
    margin: 10rem auto;
    gap: 2rem;
    height: 100%;

    .men-suit-shop {
      h2 {
        font-size: 2rem;
        line-height: 2.5rem;
        margin-bottom: 1.5rem;
      }

      p {
        font-size: 0.7rem;
        margin-bottom: 1.5rem;
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    height: 100%;
    margin: 6rem auto;
    grid-template-columns: 1fr;
    gap: 0rem;

    .men-suit {
      display: none;
    }

    .men-suit-shop {
      width: 80%;
      margin: auto;

      h2 {
        font-size: 1.5rem;
        line-height: 2.2rem;
        margin-bottom: 1rem;
      }

      p {
        line-height: 1.2rem;
        margin-bottom: 1rem;
        font-size: 0.6rem;
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.6rem;
    }
  }
`;

export default MenSuitShop;
