import React from "react";
import styled from "styled-components";

const Progress = ({ trackProgress }) => {
  const {
    basicInfo,
    productImgs,
    pricing,
    inventory,
    variations,
    shipping,
    productReady,
  } = trackProgress;
  return (
    <ProgressStyles>
      <div className="progress-bar-wrapper flex-3">
        <div className={`bar flex-3 ${basicInfo ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">1</div>
          </div>
          <div className="line"></div>
        </div>
        <div className={`bar flex-3 ${productImgs ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">2</div>
          </div>
          <div className="line"></div>
        </div>
        <div className={`bar flex-3 ${pricing ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">3</div>
          </div>
          <div className="line"></div>
        </div>
        <div className={`bar flex-3 ${inventory ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">4</div>
          </div>
          <div className="line"></div>
        </div>
        <div className={`bar flex-3 ${variations ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">5</div>
          </div>
          <div className="line"></div>
        </div>
        <div className={`bar flex-3 ${shipping ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">6</div>
          </div>
          <div className="line"></div>
        </div>
        <div className={`bar flex-3 ${productReady ? "completed" : null}`}>
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">7</div>
          </div>
          <div className="line"></div>
        </div>
      </div>
    </ProgressStyles>
  );
};

const ProgressStyles = styled.div`
  margin-bottom: 2rem;
  .progress-bar-wrapper {
    .bar {
      .outer-circle {
        width: 2rem;
        height: 2rem;
        border: 2px #f8f8f8 solid;
        border-radius: 50%;

        .inner-circle {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          font-size: 0.7rem;
          background-color: #f8f8f8;
          color: #fff;
          font-family: Montserrat-Semibold;
        }
      }

      .line {
        width: 2rem;
        height: 2px;
        background-color: var(--light-grey-extra);
      }
    }

    .completed .outer-circle {
      border: 2px #20b9b4 solid;

      .inner-circle {
        background-color: #20b9b4;
      }
    }

    .completed .line {
      background-color: var(--light-blue-color);
    }

    .bar:last-child .line {
      display: none;
    }
  }
`;

export default Progress;
