import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Buttons from "../../Buttons/Buttons";

const MenExplore = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
      "(max-width: 499px)": function () {
        const tl3 = new gsap.timeline({
          scrollTrigger: {
            trigger: ".display-1",
            toggleActions: "restart none none reverse",
          },
        });

        tl3
          .to(".display-1", {
            duration: 2,
            opacity: 0,
            x: -300,
            display: "block",
            ease: Power3.easeOut,
          })
          .to(
            ".display-2",
            {
              duration: 2,
              opacity: 0,
              x: 300,
              display: "block",
              ease: Power3.easeOut,
            },
            "-=2"
          )
          .to(
            ".men-grid",
            {
              gridTemplateColumns: "1fr 1fr 1fr",
              girdTemplateAreas: "img-1 info ",
              gridTemplateRows: "1fr",
              gap: "0rem 0rem",
            },
            "=-1"
          )
          .to(
            ".test5",
            {
              duration: 1,
              width: "15rem",
              opacity: 1,
              display: "block",
              margin: "0rem",
            },
            "-=.2"
          )
          .from(".men-info h2", {
            opacity: 0,
            y: -10,
          });
      },
    });

    ScrollTrigger.matchMedia({
      "(min-width: 500px)": function () {
        const tl3 = new gsap.timeline({
          scrollTrigger: {
            trigger: ".display-1",
            toggleActions: "restart none none reverse",
          },
        });

        tl3
          .from(".display-1", {
            duration: 1.5,
            opacity: 0,
            x: 100,
            width: "12rem",
            ease: Power3.easeOut,
          })
          .from(
            ".display-2",
            {
              duration: 1.5,
              opacity: 0,
              x: -100,
              ease: Power3.easeOut,
            },
            "-=1"
          )
          .from(
            ".men-info h2",
            {
              duration: 1.5,
              opacity: 0,
              y: -10,
            },
            "-=1"
          )
          .from(
            ".men-exp-btn",
            {
              duration: 1.5,
              opacity: 0,
              y: -5,
            },
            "-=1.2"
          );
      },
    });
  }, []);

  return (
    <MenExp className="men-grid">
      <div className="men-info test5">
        <h2>
          Stay on track <span>with new trends</span>
        </h2>
        <Link to="/men-shop/shirts">
          <Buttons
            outline
            className="men-exp-btn"
            style={{ marginLeft: "0rem" }}
          >
            <span>
              Shop Now <ArrowForwardIosIcon className="arrow" />
            </span>
          </Buttons>
        </Link>
      </div>
      <div className="men-img-container-1 shadow display-1"></div>
      <div className="men-img-container-2 shadow display-2"></div>
    </MenExp>
  );
};

const MenExp = styled.section`
  padding: 0rem 0rem;
  width: 80%;
  margin: 15rem auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem 6rem;
  grid-template-rows: 1fr 2fr;
  grid-template-areas:
    "info img-1"
    "img-2 img-1";

  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;

  .men-info {
    grid-area: info;

    h2 {
      font-size: 2.8rem;
      span {
        margin: 1rem 0rem 2rem 0rem;
      }
    }

    span {
      display: block;
    }
  }

  .men-img-container-1 {
    grid-area: img-1;
    background: url("/assets/home/men-fashion-one.jpg") no-repeat center
      center/cover;
    position: relative;
    padding: 0rem;
  }

  .men-img-container-2 {
    grid-area: img-2;
    background: url("/assets/home/men-fashion-two.jpg") no-repeat center
      center/cover;
    position: relative;
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
    height: 100%;
    margin: 10rem auto;
    gap: 3rem 4rem;
    .men-info {
      h2 {
        font-size: 2rem;
        line-height: 2.5rem;
        span {
          margin: 0rem 0rem 2rem 0rem;
        }
      }

      span {
        display: block;
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    height: 120%;
    margin: 8rem auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "img-2 info img-1";
    gap: 1rem 2rem;

    .men-img-container-1,
    .men-img-container-2 {
      display: block;
    }
    .men-info {
      display: block;
      opacity: 0;

      h2 {
        font-size: 1.5rem;
        line-height: 2.2rem;
        span {
          margin: 0rem 0rem 1rem 0rem;
        }
      }

      span {
        display: block;
      }
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.6rem;
    }
  }
`;

export default MenExplore;
