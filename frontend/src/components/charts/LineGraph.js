import React from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";

const LineGraph = ({ tension, pointRadius, datasets, yAxesLabel }) => {
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: datasets,
  };

  const chartOptions = {
    scales: {
      y: {
        ticks: {
          padding: 12,
        },
      },
      x: {
        ticks: {
          padding: 12,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 12,
          },
          padding: 40,
        },
      },
    },
    elements: {
      point: {
        radius: pointRadius,
      },
      line: {
        borderWidth: 1,
        tension: tension,
      },
    },
    resposive: true,
    maintainAspectRatio: false,
  };
  return (
    <LineGraphStyles className="flex-3">
      <span className="amount-label">{yAxesLabel}</span>
      <Line
        data={chartData}
        options={chartOptions}
        style={{ height: "25rem" }}
      />
      <span className="months">Months</span>
    </LineGraphStyles>
  );
};

const LineGraphStyles = styled.div`
  flex-direction: column;
  margin: 3rem auto;
  width: calc(100% - 8rem);
  height: 25rem;
  position: relative !important;
  color: var(--grey-color);
  font-family: Montserrat-Regular;

  .amount-label {
    top: 50%;
    left: -6rem;
    transform: translateY(-50%);
    transform: rotate(-90deg);
    position: absolute;
    font-size: 0.8rem;
  }

  .months {
    text-align: center;
    margin-top: 2rem;
  }
`;

export default LineGraph;
