import React, { useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Power3 } from "gsap";

import Buttons from "../../Buttons/Buttons";

const MenSuitExplore = () => {
  const style = {
    marginLeft: "1rem",
    fontSize: "1rem",
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl7 = new gsap.timeline({
      scrollTrigger: {
        trigger: ".men-suit-tigger",
        toggleActions: "restart none none reverse",
      },
    });

    tl7
      .from(".men-suit-tigger", {
        marginLeft: 100,
        duration: 1,
        overflow: "hidden",
        ease: Power3.easeIn,
      })
      .from(
        ".head h1",
        {
          x: -50,
          opacity: 0,
          duration: 1.5,
          ease: Power3.easeIn,
        },
        "-=1"
      )
      .from(
        ".line",
        {
          //x: 50,
          opacity: 0,
          duration: 1,
          ease: Power3.easeIn,
        },
        "-=1"
      )
      .from(
        ".suits-explore p",
        {
          //x: 50,
          opacity: 0,
          duration: 0.5,
          ease: Power3.easeIn,
        },
        "-=.5"
      )
      .from(
        ".suits-explore .men-col-btn",
        {
          //x: 50,
          opacity: 0,
          duration: 0.5,
          ease: Power3.easeIn,
        },
        "-=.3"
      );
  });

  return (
    <MenSuits className="men-suit-tigger">
      <div className="suit-wrapper">
        <div className="head">
          <h1 className="head-1">Wecome to men's</h1>
          <h1 className="head-2">world!</h1>
        </div>
        <div className="line"></div>
        <div className="suits-explore">
          <p>Suits, Ties, T-Shirts, Shoes....</p>
          <Link to="/men-shop">
            <Collection outline className="men-col-btn">
              collection <ArrowForwardIosIcon className= 'arrow' />
            </Collection>
          </Link>
        </div>
      </div>
    </MenSuits>
  );
};

const Collection = styled(Buttons)`
  background: transparent;
  position: absolute;
  bottom: 0rem;
  color: #fff;
  bottom: 1rem;
  top: 5.5rem;
  height: 3rem;
  border-color: #fff;
`;

const MenSuits = styled.section`
  height: 100%;
  padding: 10rem 0rem;
  display: flex;
  align-itmes: center;
  background: url("/assets/home/men-suit-hero.jpg") no-repeat center
    center/cover;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;
  color: #fff;
  position: relative;
  z-index: 100;
  overflow-x: hidden;

  &:before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.32);
  }

  .suit-wrapper {
    width: 80%;
    height: 60%;
    margin: auto;
    display: flex;
    justify-content: space-between;

     .head {
      width: 45%;
      margin: 5rem 0rem;
      font-size: 2.5rem;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .head-1 {
      font-size: 2.5rem;
    }

    .head-2 {
      position: absolute;
      bottom: 0;
      top: 5rem;
      right: 0;
      font-size: 4rem;
    }
  }

  .line {
    width: 5px;
    height: 100%;
    background-color: var(--red-color);
  }

  .suits-explore {
    width: 45%;
    height: 60%;
    margin-top: 5rem;
    position: relative;

    p {
      font-family: Montserrat-Medium;
      font-size: 1.2rem;
      margin-top: 1rem;
    }
  }

  .arrow{
    margin-left: 1rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 1024px){
    height: 100%;
    padding: 10rem 0rem;
    .suit-wrapper {
      .head {
        width: 45%;
        margin: 5rem 0rem;
        font-size: 2rem;
      }
  
      .head-1 {
        font-size: 1.5rem;
      }
  
      .head-2 {
        bottom: 0rem;
        top: 5rem;
        font-size: 3rem;
      }
    }

    .line {
      width: 4px;
      height: 100%;
    }

    .suits-explore {
      margin-top: 5rem;
  
      p {
        font-size: .8rem;
        margin-top: 0.4rem;
      }
    }

    .men-col-btn{
      bottom: 4rem;
      padding: 0.5rem 0rem;
    }

    .arrow{
      margin-left: 1rem;
      font-size: .8rem;
    }
  }

  @media screen and (max-width: 500px){
    height: 100%;
    padding: 3rem 0rem;
    .suit-wrapper{
      padding: 2rem 0rem;
      justify-content: none;
    }

    .head {
      width: 50rem;
      margin: 5rem 0rem;
      height: 5rem;
    }

    .head-1 {
      font-size: 1.2rem !important;
      width: 15rem !important;
      display: block;
    }

    .head-2 {
      left: 5.5rem;
      font-size: 2rem !important;
    }

    .line, .suits-explore{
      display: none;
    }

  }
`;

export default MenSuitExplore;
