import React from "react";
import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Doughnut = ({ count, color, shadowColor }) => {
  return (
    <DoughnutStyles style={{ boxShadow: shadowColor }}>
      <CircularProgressbar
        value={count}
        text={`${count}`}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: color,
        })}
      />
    </DoughnutStyles>
  );
};

const DoughnutStyles = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  padding: 0.8rem;
  margin-right: 1rem;
  margin-top: -0.5rem;
  border-radius: 50%;
`;

export default Doughnut;
