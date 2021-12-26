import React from "react";
import styled from "styled-components";

const ProgressBar = () => {
  return (
    <ProgressBarStyles className="progress">
      <div className="show-progress">
        <div>1</div>
        <div></div>
        <span>Cart</span>
      </div>
      <div className="show-progress">
        <div>2</div>
        <div></div>
        <span>Delivery</span>
      </div>
      <div className="show-progress">
        <div>3</div>
        <span>Payment</span>
      </div>
    </ProgressBarStyles>
  );
};

const ProgressBarStyles = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  font-family: Montserrat-Medium;

  .show-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border: 2px #5a5a5a solid;
    border-radius: 1000px;
    position: relative;

    div:first-child {
      height: 3rem;
      width: 3rem;
      border-radius: 1000px;
      background: var(--primary-grey);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }

    div:nth-child(2) {
      width: 5.2rem;
      height: 2px;
      background: var(--primary-grey);
      position: absolute;
      left: 3.8rem;
      z-index: -1;
    }

    span {
      position: absolute;
      bottom: -3rem;
      transform: translate(-50%; -50%);
      font-size: 0.85rem;
    }
  }

  .show-progress:last-child {
    border-color: #aaaaaa;

    div:first-child {
      background: var(--secondary-grey);
    }
  }

  @media screen and (max-width: 500px) {
    .show-progress {
      width: 3rem;
      height: 3rem;

      div:nth-child(2) {
        width: 6.2rem;
        left: 2rem;
      }

      span {
        font-size: 0.9rem;
      }
    }
  }
`;

export default ProgressBar;
