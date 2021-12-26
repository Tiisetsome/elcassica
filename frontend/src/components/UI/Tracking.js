import React from "react";
import styled from "styled-components";

const Tracking = ({ orderTracking }) => {
  return (
    <TrackingStyles>
      <div className="progress-bar-wrapper">
        <div
          className={`bar  flex-2 ${
            orderTracking.isProcessing ? "completed" : ""
          }`}
        >
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">1</div>
            <div className="line"></div>
          </div>
          <p>Processing</p>
        </div>
        <div
          className={`bar  flex-2 ${
            orderTracking.isShipped ? "completed" : ""
          }`}
        >
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">2</div>
            <div className="line"></div>
          </div>
          <p>Shipped</p>
        </div>
        <div
          className={`bar  flex-2 ${
            orderTracking.isDelivered ? "completed" : ""
          }`}
        >
          <div className="outer-circle flex-3">
            <div className="inner-circle flex-3">3</div>
            <div className="line"></div>
          </div>
          <p>Delivered</p>
        </div>
      </div>
    </TrackingStyles>
  );
};

const TrackingStyles = styled.div`
  margin-bottom: 2rem;
  .progress-bar-wrapper {
    .bar {
      gap: 2rem;
      margin-bottom: 2.8rem;

      .outer-circle {
        width: 1.8rem;
        height: 1.8rem;
        border: 2px #f8f8f8 solid;
        border-radius: 50%;
        position: relative;

        .inner-circle {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50%;
          font-size: 0.7rem;
          background-color: #f8f8f8;
          color: #fff;
          font-family: Montserrat-Semibold;
        }
      }
      .line {
        top: 1.6rem;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 3rem;
        background-color: var(--light-blue);
        position: absolute;
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

export default Tracking;
