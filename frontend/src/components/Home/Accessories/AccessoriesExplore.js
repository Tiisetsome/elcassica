import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

import Buttons from "../../Buttons/Buttons";

const AccessoriesExplore = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl5 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".accesories-trigger",
        toggleActions: "restart none none reverse",
      },
    });

    tl5
      .from(".accesories-trigger", {
        duration: 1,
        x: -50,
      })
      .from(
        ".accesories-trigger .img-1",
        {
          transform: "scale(0.7)",
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=1"
      )
      .from(
        ".accesories-trigger .img-2",
        {
          transform: "scale(0.7)",
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      )
      .from(
        ".accesories-trigger .img-3",
        {
          transform: "scale(1.1)",
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=1"
      )
      .from(
        ".accesories-trigger .img-4",
        {
          transform: "scale(1.3)",
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      )
      .from(
        ".accesories-trigger .img-5",
        {
          transform: "scale(0.8)",
          duration: 1,
          ease: Power3.easeOut,
        },
        "-=.8"
      )
      .from(
        ".details h2",
        {
          opacity: 0,
          duration: 1,
          x: 50,
          ease: Power3.easeInOut,
        },
        "-=1"
      )
      .from(
        ".details p",
        {
          opacity: 0,
          duration: 1,
          y: 20,
          ease: Power3.easeInOut,
        },
        "-=1"
      )
      .from(
        ".details Button",
        {
          opacity: 0,
          duration: 1,
          x: 50,
          ease: Power3.easeInOut,
        },
        "-=1"
      );
  });
  return (
    <AccessoriesExp>
      <div className="images-wrapper accesories-trigger">
        <div className="img-1 shadow"></div>
        <div className="img-2-container">
          <div className="img-2 shadow"></div>
          <div className="img-3 shadow"></div>
          <div className="img-4 shadow"></div>
        </div>
        <div className="img-5 shadow">3</div>
      </div>
      <div className="details-wrapper">
        <div className="details">
          <h2>More swag for your liking with a wide range of accessories</h2>
          <p>Wallets, Shades, Belts, Bracelets and more.....</p>
          <Link to="accessories-shop/">
            <Buttons outline>
              Shop Now
              <span>
                <ArrowForwardIosIcon className="arrow" />
              </span>
            </Buttons>
          </Link>
        </div>
      </div>
    </AccessoriesExp>
  );
};

const AccessoriesExp = styled.section`
  width: 80%;
  margin: 15rem auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  text-transform: uppercase;

  .images-wrapper {
    display: grid;
    gap: 1rem;
    grid-template-rows: 2fr 1.5fr;
    grid-template-areas:
      "container-1 container-2"
      "container-3 container-3";

    .img-1 {
      grid-area: container-1;
      background: url("/assets/home/bracelet.jpg") no-repeat center center/cover;
      position: relative;
    }

    .img-2-container {
      grid-area: container-2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      grid-template-areas:
        "container-4 container-5"
        "container-6 container-6";

      .img-2 {
        grid-area: container-4;
        background: url("/assets/home/watch-three.jpg") no-repeat center
          center/cover;
        position: relative;
      }

      .img-3 {
        grid-area: container-5;
        background: url("/assets/home/belt.jpg") no-repeat center center/cover;
        position: relative;
      }

      .img-4 {
        grid-area: container-6;
        background: url("/assets/home/wallet.jpg") no-repeat center center/cover;
        position: relative;
      }
    }

    .img-5 {
      grid-area: container-3;
      background: url("/assets/home/shades.jpg") no-repeat center center/cover;
      position: relative;
    }
  }

  .details-wrapper {
    padding: 5rem 0rem;
    display: flex;
    align-items: center;

    .details h2 {
      font-family: BauerBodoniStd-Bold;
      font-size: 2.8rem;
      line-height: 4rem;
      margin-bottom: 2rem;
    }

    .details p {
      font-family: Montserrat-Medium;
      font-size: 1rem;
      margin-bottom: 2rem;
      color: var(--primary-grey);
    }
  }

  .shadow:before {
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

    .images-wrapper {
      grid-template-columns: 1.5fr 1.5fr;
    }

    .details-wrapper {
      .details h2 {
        font-size: 2rem;
        line-height: 2.5rem;
        margin-bottom: 1.5rem;
      }

      .details p {
        font-size: 0.7rem;
        line-height: 1.5rem;
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

    .images-wrapper {
      display: none;
    }

    .details-wrapper {
      width: 80%;
      margin: auto;
      .details h2 {
        font-size: 1.5rem;
        line-height: 2.2rem;
        margin-bottom: 1rem;
      }

      .details p {
        font-size: 0.6rem;
        line-height: 1.2rem;
        margin-bottom: 1rem;
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.6rem;
    }
  }
`;

export default AccessoriesExplore;
