import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const CircularProgress = ({
  heading,
  count,
  color,
  shadowColor,
  Icon,
  iconSize,
}) => {
  const style = {
    width: "5rem",
    height: "5rem",
  };
  return (
    <CircularProgressStyles className="card">
      <div className="card-info flex-2">
        <div className="icon flex-3">
          <Icon style={{ fontSize: `${iconSize}rem`, color }} />
        </div>
        <p>{heading}</p>
      </div>
      <div
        className="circular-progress-wrapper"
        style={{ boxShadow: shadowColor }}
      >
        <CircularProgressbar
          value={count}
          text={`${count}`}
          strokeWidth={4}
          styles={buildStyles({
            pathColor: color,
          })}
        />
      </div>
    </CircularProgressStyles>
  );
};

const CircularProgressStyles = styled.div`
  font-family: Montserrat-Medium;
  color: var(--grey-color);
  .card-info {
    gap: 1rem;
    margin-bottom: 2rem;

    .icon {
      width: 3rem;
      height: 3rem;
      border-radius: 100rem;
      background-color: var(--body-color);
      position: relative;
    }

    p {
      font-family: Montserrat-Semibold;
    }
  }

  .circular-progress-wrapper {
    width: 7rem;
    height: 7rem;
    padding: 1.2rem;
    margin-left: 2rem;
    border-radius: 50%;
  }
`;

export default CircularProgress;
