import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Container from "../../../containers/Container";
import LineGraph from "../../charts/LineGraph";
import DropDown from "../../Buttons/DropDown";
import OrderAnalysisCard from "../Cards/OrderAnalysisCard";

const OrderAnalysis = ({ orders, users }) => {
  const [ordersCurrentYearDisplay, setOrdersCurrentYearDisplay] = useState(
    new Date().getFullYear()
  );

  const [orderTotals, setOrderTotals] = useState(null);

  const [quarterSales, setQuarterSales] = useState({
    first: {
      totalSales: 0,
      numberOfOrders: 0,
      customers: 0,
    },
    last: {
      totalSales: 0,
      numberOfOrders: 0,
      customers: 0,
    },
    percentages: {
      sales: 0,
      orders: 0,
      customers: 0,
    },
    message: "",
  });

  const salesPerMonth = {};

  const addMonthsWithTotals = () => {
    for (let i = 0; i < 12; i++) {
      salesPerMonth[i] = {
        total: 0,
        totalLoses: 0,
        numberOfOrders: 0,
        totalCustomers: 0,
      };
    }
  };

  const totalSales = () => {
    const sales = [];
    const loses = [];
    const numberOfOrders = [];
    const customers = [];
    for (const month in salesPerMonth) {
      sales.push(salesPerMonth[month].total);
      loses.push(salesPerMonth[month].totalLoses);
      numberOfOrders.push(salesPerMonth[month].numberOfOrders);
      customers.push(salesPerMonth[month].totalCustomers);
    }

    return {
      sales,
      loses,
      numberOfOrders,
      customers,
    };
  };

  const getTotalSalesFromOrders = (selectedYear) => {
    addMonthsWithTotals();
    orders.forEach((order) => {
      const orderDate = new Date(order.updatedAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();
      if (order.isPaid && year === selectedYear) {
        salesPerMonth[month].total += order.totalPrice;
        salesPerMonth[month].numberOfOrders += 1;
      } else if (year === selectedYear) {
        salesPerMonth[month].totalLoses += order.totalPrice;
      }
    });

    users.forEach((user) => {
      const customerRegisterDate = new Date(user.createdAt);
      const month = customerRegisterDate.getMonth();
      const year = customerRegisterDate.getFullYear();
      if (year === selectedYear) {
        salesPerMonth[month].totalCustomers += 1;
      }
    });

    const orderSales = totalSales();

    setOrderTotals(orderSales);
  };

  const chartDatatSet = () => {
    const dataset = [
      {
        label: "Completed Orders",
        data: orderTotals ? orderTotals.sales : [],
        backgroundColor: "#009d54",
        borderColor: "#009d54",
        fill: false,
      },
      {
        label: "Cancelled Orders",
        data: orderTotals ? orderTotals.loses : [],
        backgroundColor: "#bf0059",
        borderColor: "#bf0059",
        fill: false,
      },
    ];
    return dataset;
  };

  const getTotalQuarterSales = (sales) => {
    return sales.reduce((total, currentVal) => {
      return total + currentVal;
    }, 0);
  };

  const calculatePercentage = (firstValue, secondValue) => {
    let percentage = 0;

    if (secondValue === 0 || firstValue === 0) {
      return 100;
    } else if (firstValue > secondValue) {
      percentage = Math.round((secondValue / firstValue) * 100);
    } else {
      percentage = Math.round((firstValue / secondValue) * 100);
    }

    return percentage;
  };

  const getPercentage = (firstQuarterTotal, secondQuarterTotal) => {
    let tempPercentage = calculatePercentage(
      firstQuarterTotal,
      secondQuarterTotal
    );

    let actualPercentage = tempPercentage;

    let absolutePercentage = Math.abs(actualPercentage);

    return absolutePercentage === 0 ? 100 : absolutePercentage;
  };

  const setAnalysisData = (orderTotals) => {
    let quarterSales = {
      first: {
        totalSales: 0,
        numberOfOrders: 0,
        customers: 0,
      },
      last: {
        totalSales: 0,
        numberOfOrders: 0,
        customers: 0,
      },
      percentages: {
        sales: 0,
        orders: 0,
        customers: 0,
      },
      message: "",
    };

    if (orderTotals) {
      const firstQuarterSales = orderTotals.sales.slice(0, 6);
      const lastQuarterSales = orderTotals.sales.slice(6, 12);

      const firstQuarterOrders = orderTotals.numberOfOrders.slice(0, 6);
      const lastQuarterOrders = orderTotals.numberOfOrders.slice(6, 12);

      const firstQuarterCustomers = orderTotals.customers.slice(0, 6);
      const lastQuarterCustomers = orderTotals.customers.slice(6, 12);

      const totalFirstQuarterSales = getTotalQuarterSales(firstQuarterSales);
      const totalLastQuarterSales = getTotalQuarterSales(lastQuarterSales);

      const totalFirstQuarterOrders = getTotalQuarterSales(firstQuarterOrders);
      const totalLastQuarterOrders = getTotalQuarterSales(lastQuarterOrders);

      const totalFirstQuarterCustomers = getTotalQuarterSales(
        firstQuarterCustomers
      );
      const totalLastQuarterCustomers =
        getTotalQuarterSales(lastQuarterCustomers);

      quarterSales.first.totalSales = totalFirstQuarterSales;
      quarterSales.last.totalSales = totalLastQuarterSales;

      quarterSales.first.numberOfOrders = totalFirstQuarterOrders;
      quarterSales.last.numberOfOrders = totalLastQuarterOrders;

      quarterSales.first.customers = totalFirstQuarterCustomers;
      quarterSales.last.customers = totalLastQuarterCustomers;

      const currentMonth = new Date().getMonth();

      let percentage = 0;
      let orderPercentage = 0;
      let customerPercentage = 0;

      if (currentMonth <= 5) {
        percentage = 100;
        percentage = 0;
        quarterSales.message =
          "You are currently in the first quarter of the current selected year. The sales percentage cannot be determined as yet. It will be evaluated in the second quarter";
      } else if (currentMonth > 5) {
        orderPercentage = getPercentage(
          totalFirstQuarterOrders,
          totalLastQuarterOrders
        );

        percentage = getPercentage(
          totalFirstQuarterSales,
          totalLastQuarterSales
        );

        customerPercentage = getPercentage(
          totalFirstQuarterCustomers,
          totalLastQuarterCustomers
        );

        quarterSales.message =
          totalFirstQuarterSales === 0 && totalLastQuarterSales === 0
            ? `There's no enough data to determine the sale overview of the current year selected.`
            : totalFirstQuarterSales === 0
            ? `Q2 performed exceptionally well in terms of sales, with a revenue of ${100}% compared to the previous quarter.`
            : totalLastQuarterSales === 0
            ? `Q1 performed exceptionally well in terms of sales, with a revenue of ${100}% compared to the previous quarter.`
            : totalLastQuarterSales > totalFirstQuarterSales
            ? `Q2 performed exceptionally well in terms of sales, with a revenue of ${percentage}% compared to the previous quarter.`
            : totalFirstQuarterSales > totalLastQuarterSales
            ? `Q1 performed exceptionally well in terms of sales, with a revenue of ${percentage}% compared to the previous quarter.`
            : `Both quarters performed equally in terms of sales for the current year selected.`;
      }
      quarterSales.percentages.sales = percentage;
      quarterSales.percentages.orders = orderPercentage;
      quarterSales.percentages.customers = customerPercentage;

      setQuarterSales(quarterSales);
    }
  };

  useEffect(() => {
    getTotalSalesFromOrders(ordersCurrentYearDisplay);
  }, [ordersCurrentYearDisplay]);

  useEffect(() => {
    setAnalysisData(orderTotals);
  }, [orderTotals]);

  return (
    <OrderAnalysisStyles>
      <Container
        label="Store Performance"
        InfoComponent={DropDown}
        componentExists={true}
        showNotification={false}
        changeYearDisplayHandler={setOrdersCurrentYearDisplay}
      >
        <LineGraph
          datasets={orders.length > 0 ? chartDatatSet() : []}
          yAxesLabel="Amount in ( Rands )"
          tension={0.35}
          pointRadius={2}
        />

        <section className="summary-container">
          <div className="summary">
            <h4>Overview</h4>
            <p>{quarterSales.message}</p>
          </div>
          <div className="summary-cards">
            <OrderAnalysisCard
              heading="Revenue"
              lastQuarterVal={quarterSales.first.totalSales}
              currentQuarterVal={quarterSales.last.totalSales}
              count={quarterSales.percentages.sales}
              color="var(--gold-color)"
              shadowColor="red"
            />
            <OrderAnalysisCard
              heading="Orders"
              lastQuarterVal={quarterSales.first.numberOfOrders}
              currentQuarterVal={quarterSales.last.numberOfOrders}
              count={quarterSales.percentages.orders}
              color="var(--gold-color)"
              shadowColor="red"
            />
            <OrderAnalysisCard
              heading="Customers"
              lastQuarterVal={quarterSales.first.customers}
              currentQuarterVal={quarterSales.last.customers}
              count={quarterSales.percentages.customers}
              color="var(--gold-color)"
              shadowColor="red"
            />
            <OrderAnalysisCard
              heading="Expenditure"
              lastQuarterVal={20236.0}
              currentQuarterVal={40362.0}
              count={75}
              color="var(--gold-color)"
              shadowColor="red"
            />
          </div>
        </section>
      </Container>
    </OrderAnalysisStyles>
  );
};

const OrderAnalysisStyles = styled.section`
  margin: 3rem 0rem;

  .summary-container {
    margin: 5rem 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }

  .summary {
    padding: 5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    background-image: linear-gradient(#022c41, #0971a5);

    h4 {
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }

    p {
      line-height: 1.5rem;
    }
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

export default OrderAnalysis;
