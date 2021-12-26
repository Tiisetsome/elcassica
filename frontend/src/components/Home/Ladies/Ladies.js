import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { TweenMax, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";

import Buttons from "../../Buttons/Buttons";

const style = {
  marginLeft: "1rem",
  fontSize: "1rem",
};

const Ladies = () => {
  //gsap.registerPlugin(ScrollTrigger);
  //let item = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = new gsap.timeline({
      scrollTrigger: {
        trigger: ".img-container-1",
        toggleActions: "restart none none reverse",
        //start: "center center",
        // markers: true,
      },
    });

    tl.from(".img-container-1", {
      // height: 0,
      duration: 2,
      x: -100,
      opacity: 0,
      //width: 500,
      ease: Power3.easeOut,
    })
      .from(
        ".img-container-2",
        {
          // height: 0,
          duration: 2,
          x: 100,
          opacity: 0,
          ease: Power3.easeOut,
        },
        "-=1.5"
      )
      .from(
        ".fadeIn",
        {
          y: -50,
          color: "grey",
          opacity: 0,
          duration: 0.7,
          // fontSize: "1rem",
          ease: Power3.easeOut,
        },
        "-=1.5"
      )
      .from(
        ".test",
        {
          color: "black",
          duration: 1,
          opacity: 0,
          y: 10,
          ease: Power3.easeOut,
        },
        "-=1"
      )
      .from(
        ".test2",
        {
          opacity: 0,
          duration: 1,
          y: 10,
          ease: Power3.easeOut,
        },
        "-=.8"
      );
  }, []);

  return (
    <LadiesStyle>
      <div className="img-container-1 dropshadow"></div>
      <div className="ladies-info">
        <div>
          <h2
            // ref={(el) => {
            //   item = el;
            // }}
            className="fadeIn"
          >
            Explore Ladies <span>World</span>
          </h2>
          <p className="test">
            Life isn't perfect but your outfit can be. Pay less and stay in
            fashion!
          </p>
          <Link to="/women-shop">
            <Buttons outline className="test2">
              <span>
                Shop Now <ArrowForwardIosIcon className='arrow' />
              </span>
            </Buttons>
          </Link>
        </div>
      </div>
      <div className="img-container-2 dropshadow"></div>
    </LadiesStyle>
  );
};

const LadiesStyle = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: 4rem;
  width: 80%;
  margin: auto;
  padding: 15rem 0rem;
  text-transform: uppercase;

  .ladies-info {
    height: 30rem;
    display: flex;
    align-items: center;
  }

  .ladies-info h2 {
    margin-bottom: 2rem;
    font-size: 2.6rem;
    font-family: BauerBodoniStd-Bold;
  }

  .ladies-info h2 span {
    display: block;
    margin-top: 1rem;
  }

  .ladies-info p {
    line-height: 2rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: Montserrat-Medium !important;
    color: var(--primary-grey);
  }

  .img-container-1,
  .img-container-2 {
    width: 100%;
    background: red;
    height: 30rem;
    position: relative;
  }

  .img-container-1 {
    background: url("/assets/home/lady-shopping-1.jpg") no-repeat center
      center/cover;
  }

  .img-container-2 {
    background: url("/assets/home/lady-shopping-2.jpg") no-repeat center
      center/cover;
  }

  .dropshadow:before {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.42);
  }

  .arrow{
    margin-left: 1rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 1024px){
    display: grid;
    grid-template-columns: 1fr .8fr 1fr;
    gap: 1.5rem;
    padding: 8rem 0rem;

    .ladies-info {
      height: 20rem;
    }

    .img-container-1,
    .img-container-2 {
      width: 100%;
      height: 20rem;
      position: relative;
    }
    
  .ladies-info h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    line-height: 2.5rem;
  }

  .ladies-info h2 span {
    margin-top: 0rem;
  }

  .ladies-info p {
    line-height: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.6rem;
  }

  .test2{
    padding: 0.5rem 0rem
  }

  .arrow{
    margin-left: 1rem;
    font-size: .8rem;
    }
  }

  @media screen and (max-width: 500px){
    width: 90%;
    padding: 6rem 0rem;
    grid-template-columns: 1fr 1fr;
    .img-container-2 {
      display: none;
    }

    .ladies-info h2 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
      line-height: 2.2rem;
    }

    .ladies-info p {
      line-height: 1.2rem;
      margin-bottom: 1rem;
      font-size: 0.6rem;
    }

    .arrow{
      margin-left: .5rem;
      font-size: .6rem;
    }
  }
`;

export default Ladies;
