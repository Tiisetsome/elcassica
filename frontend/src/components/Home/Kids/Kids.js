import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

import Buttons from "../../Buttons/Buttons";
import { duration } from "@material-ui/core";

export const Kids = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl10 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".kids-hero-trigger",
        toggleActions: "restart none none reverse",
      },
    });

    tl10
      .from(".kids-hero-trigger", {
        width: "80%",
        duration: 1.5,
        ease: Power3.easeOut,
      })
      .from(
        ".kids-shop h3",
        {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=1"
      )
      .from(
        ".kids-shop h2",
        {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      )
      .from(
        ".kids-shop h1",
        {
          opacity: 0,
          x: -20,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.5"
      )
      .from(
        ".kids-shop .kids-buy-btn",
        {
          opacity: 0,
          y: -20,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      )
      .from(
        ".kids-shop .kids-collection-btn",
        {
          opacity: 0,
          y: -20,
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      );
  });

  return (
    <KidsHero className="kids-hero-trigger">
      <div className="kid-hero-wrapper">
        <div className="kids-shop">
          <h3>Take a look at.....</h3>
          <h2>Perfect sytle for.....</h2>
          <h1>Your kids!</h1>
          <div className="kids-btns">
            <Link to="/kids-shop">
              <ShopBtn className="kids-buy-btn">
                Shop Now{" "}
                <span>
                  <ArrowForwardIosIcon className="arrow" />
                </span>
              </ShopBtn>
            </Link>
            <Link to="/kids-shop">
              <CollectionBtn outline className="kids-collection-btn">
                Collection{" "}
                <span>
                  <ArrowForwardIosIcon className="arrow" />
                </span>
              </CollectionBtn>
            </Link>
          </div>
        </div>
      </div>
    </KidsHero>
  );
};

const KidsHero = styled.section`
  padding: 10rem 0rem;
  background: url("/assets/home/kid-hero.jpg") no-repeat center center/cover;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;
  position: relative;
  z-index: 100;
  color: #fff;

  &:before {
    content: "";
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.22);
    z-index: -1;
  }
  .kid-hero-wrapper {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    .kids-shop {
      width: 60%;

      h1,
      h2,
      h3 {
        margin-bottom: 2rem;
      }

      h3 {
        font-size: 2rem;
      }

      h2 {
        font-size: 3rem;
        margin-left: 1rem;
      }

      h1 {
        font-size: 4.5rem;
        margin-left: 3rem;
      }

      .kids-btns {
        margin-left: 3.5rem;
      }
    }
  }

  .arrow {
    margin-left: 1rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 1024px) {
    height: 100%;
    padding: 10rem 0rem;
    .kid-hero-wrapper {
      .kids-shop {
        width: 60%;

        h1,
        h2,
        h3 {
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.3rem;
        }

        h2 {
          font-size: 1.6rem;
          margin-left: 2rem;
        }

        h1 {
          font-size: 3rem;
          margin-left: 4rem;
        }

        .kids-btns {
          margin-left: 4.5rem;

          .kids-buy-btn,
          .kids-collection-btn {
            width: 8rem;
            display: inline-block;
          }

          .kids-collection-btn {
            padding: 0.7rem 0.1rem;
            display: none;
          }
        }
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    &:before {
      width: 100%;
    }

    .kid-hero-wrapper {
      .kids-shop {
        width: 100% !important;
        h3 {
          font-size: 0.9rem;
        }

        h2 {
          font-size: 1.3rem;
          margin-left: 2rem;
        }

        h1 {
          font-size: 2rem;
          margin-left: 4rem;
        }
      }
    }
  }
`;

const ShopBtn = styled(Buttons)`
  background-color: black;
`;

const CollectionBtn = styled(Buttons)`
  color: #fff;
  border-color: #fff;
  background-color: transparent;
`;

export default Kids;
