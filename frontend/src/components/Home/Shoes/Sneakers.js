import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

import Buttons from "../../Buttons/Buttons";

const Sneakers = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl9 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".sneaker-trigger",
        toggleActions: "restart none none reverse",
      },
    });

    tl9
      .from(".sneaker-trigger", {
        x: -100,
        opacity: 0,
        duration: 2,
        ease: Power3.easeOut,
      })
      .from(
        ".sneaker-collection h2",
        {
          x: 100,
          opacity: 0,
          duration: 2,
          ease: Power3.easeOut,
        },
        "-=1.5"
      )
      .from(
        ".sneaker-collection p",
        {
          x: 100,
          opacity: 0,
          duration: 2,
          ease: Power3.easeOut,
        },
        "-=1.6"
      )
      .from(
        ".sneaker-collection .collection-btn",
        {
          x: 100,
          opacity: 0,
          duration: 2,
          ease: Power3.easeOut,
        },
        "-=1.5"
      )
      .from(
        ".sneaker-img-2 ",
        {
          x: 100,
          opacity: 0,
          duration: 2,
          ease: Power3.easeOut,
        },
        "-=2"
      )
      .from(
        ".sneaker-shop-details h2",
        {
          x: -100,
          opacity: 0,
          duration: 2,
          ease: Power3.easeOut,
        },
        "-=2"
      )
      .from(
        ".sneaker-shop-details .buy-btn",
        {
          x: -100,
          opacity: 0,
          duration: 2,
          ease: Power3.easeOut,
        },
        "-=1.5"
      );
  });

  return (
    <SneakerSection>
      <div className="sneaker-img-1 shadow sneaker-trigger"></div>
      <div className="sneaker-collection">
        <h2>Keep rocking with our latest edition of sneakers</h2>
        <p>Nike, Adidas, Vans, Puma, Lacoste, And More....</p>
        <Link to="/men-shop/shoes">
          {" "}
          <Buttons outline className="collection-btn">
            Collection
            <span>
              <ArrowForwardIosIcon className="arrow" />
            </span>
          </Buttons>
        </Link>
      </div>
      <div className="sneaker-shop">
        <div className="sneaker-shop-details">
          <h2>Come on you like them righ? why not grab one....</h2>
          <Link to="/men-shop/shoes">
            <ShopBtn className="buy-btn">
              Shop now{" "}
              <span>
                <ArrowForwardIosIcon className="arrow" />
              </span>
            </ShopBtn>
          </Link>
        </div>
      </div>
      <div className="sneaker-img-2 shadow"></div>
    </SneakerSection>
  );
};

const SneakerSection = styled.section`
  width: 80%;
  margin: 15rem auto;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 0rem 5rem;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;

  .sneaker-img-1 {
    background: url("/assets/home/sneaker-1.jpg") no-repeat center center/cover;
    position: relative;
    height: 30rem;
  }

  .sneaker-img-2 {
    background: url("/assets/home/sneaker-2.jpg") no-repeat center center/cover;
    position: relative;
    height: 40rem;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 4rem;
    margin-bottom: 2rem;
  }

  p {
    font-family: Montserrat-Medium;
    font-size: 1em;
    margin-bottom: 2rem;
    color: var(--primary-grey);
  }

  .sneaker-shop {
    display: flex;
    align-items: center;

    h2 {
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
    gap: 0rem 2rem;

    .sneaker-img-1 {
      height: 20rem;
    }

    .sneaker-img-2 {
      height: 25rem;
    }

    h2 {
      font-size: 1.8rem;
      line-height: 2.5rem;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 0.8rem;
      margin-bottom: 1.5rem;
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.8rem;
    }
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    margin: 6rem auto;
    gap: 0rem 1rem;

    h2 {
      font-size: 1rem;
      line-height: 1.8rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 0.6rem;
      margin-bottom: 1rem;
      line-height: 1.2rem;
    }

    .sneaker-img-2 {
      height: 20rem;
    }

    .arrow {
      margin-left: 1rem;
      font-size: 0.6rem;
    }
  }
`;

const ShopBtn = styled(Buttons)`
  background: black;
`;

export default Sneakers;
