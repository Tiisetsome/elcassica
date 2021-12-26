import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

import UserContext from "../../context/users/userContext";

const BarGraph = ({ customersCurrentYearDisplay }) => {
  const userContext = useContext(UserContext);
  const { users } = userContext;

  const createMonthsObj = () => {
    const months = {};
    for (let month = 0; month < 12; month++) {
      months[month] = 0;
    }
    return months;
  };

  const getNumberOfCustomers = (months) => {
    const numberOfCustomers = [];
    for (let month in months) {
      numberOfCustomers.push(months[month]);
    }
    return numberOfCustomers;
  };
  const getCustomers = (yearSelected) => {
    const months = createMonthsObj();
    users.forEach((user) => {
      const fullDate = new Date(user.createdAt);
      const yearCustomerCreated = fullDate.getFullYear();
      const monthCustomerCreated = fullDate.getMonth();
      if (yearCustomerCreated === yearSelected) {
        months[monthCustomerCreated] = months[monthCustomerCreated] + 1;
      }
    });

    const customersPerMonth = getNumberOfCustomers(months);

    return customersPerMonth;
  };

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
    datasets: [
      {
        label: "New Customers",
        data: getCustomers(customersCurrentYearDisplay),
        backgroundColor: ["#927500"],
      },
      {
        label: "Returning Customers",
        data: [
          400, 5000, 2500, 1700, 4000, 5800, 6800, 3500, 1400, 2000, 3600, 4500,
        ],
        backgroundColor: ["#009d54"],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    resposive: true,
    maintainAspectRatio: false,
  };
  return (
    <BarGraphStyles className="flex-2">
      <div className="chart-wrapper">
        <span className="amount-label">Number of customers</span>
        <Bar
          data={chartData}
          options={chartOptions}
          style={{ height: "22rem" }}
        />
        <span className="months">Months</span>
      </div>
    </BarGraphStyles>
  );
};

const BarGraphStyles = styled.div`
  margin: 3rem auto;
  width: 100%;
  .chart-wrapper {
    margin-bottom: 3rem;
    flex-direction: column;
    width: calc(90%);
    margin-left: 4rem;
    height: 26rem;
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
      display: inline-block;
      width: 100%;
      text-align: center;
      margin: auto;
      margin-top: 2rem;
    }
  }
`;

export default BarGraph;
