import React from "react";
import styled from "styled-components";
import Doughnut from "../ProgressBars/Doughnut";

const OrderAnalysisCard = ({
  heading,
  lastQuarterVal,
  currentQuarterVal,
  count,
  color,
  shadowColor,
}) => {
  return (
    <OrderAnalysisCardStyles>
      <div className="analysis-card">
        <div className="analysis-details">
          <p>{heading}</p>
          <div className="data-wrapper flex-2">
            <div className="data">
              <div>
                <span>Last Quarter : </span>
                <span>{lastQuarterVal}</span>
              </div>
              <div>
                <span>Current Quarter : </span>
                <span>{currentQuarterVal}</span>
              </div>
            </div>
            <Doughnut count={count} color={color} shadowColor={shadowColor} />
          </div>
        </div>
      </div>
    </OrderAnalysisCardStyles>
  );
};

const OrderAnalysisCardStyles = styled.div`
  .analysis-card {
    border: 1px #d6d6d6 solid;

    .analysis-details {
      p {
        padding: 0.5rem 1rem;
        border-bottom: 1px #d6d6d6 solid;
        font-family: Montserrat-Semibold;
        color: var(--grey-color);
      }

      .data-wrapper {
        justify-content: space-between;

        .data {
          padding: 0rem 2rem;
          margin: 2rem 0rem;

          div {
            margin-bottom: 1rem;
            position: relative;
            font-size: 0.7rem;

            &:first-child:before,
            &:last-child:before {
              content: " ";
              top: 50%;
              left: -1rem;
              width: 8px;
              height: 8px;
              transform: translateY(-50%);
              border-radius: 50%;
              background-color: var(--light-grey);
              position: absolute;
            }

            &:last-child:before {
              background-color: var(--grey-color);
            }
          }

          div:last-child {
            font-family: Montserrat-Semibold;
          }
        }
      }
    }
  }
`;

export default OrderAnalysisCard;
