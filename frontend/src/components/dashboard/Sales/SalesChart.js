import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import OrderContext from "../../../context/orders/orderContext";
import Container from "../../../containers/Container";
import DropDown from "../../Buttons/DropDown";
import LineGraph from "../../charts/LineGraph";

const SalesChart = ({ user }) => {
  const ordersContext = useContext(OrderContext);
  const { dashOrders, fetchOrders } = ordersContext;

  const [groupedSalesProducts, setGroupedSalesProducts] = useState({
    menProductsGroup: [],
    womenProductsGroup: [],
    kidsProductsGroup: [],
  });

  const [ordersCurrentYearDisplay, setOrdersCurrentYearDisplay] = useState(
    new Date().getFullYear()
  );

  const createOrderMonthsPerShop = () => {
    const months = {
      menProducts: {},
      womenProducts: {},
      kidsProducts: {},
    };

    for (let month = 0; month < 12; month++) {
      months.menProducts = {
        ...months.menProducts,
        [month]: 0,
      };
      months.womenProducts = {
        ...months.menProducts,
        [month]: 0,
      };
      months.kidsProducts = {
        ...months.menProducts,
        [month]: 0,
      };
    }

    return months;
  };

  const groupOrdersByShop = (currentYearDisplay) => {
    const ordersPerShop = {
      menProducts: [],
      womenProducts: [],
      kidsProducts: [],
    };

    dashOrders.forEach((order) => {
      const fullDate = new Date(order.createdAt);
      const yearOrderCreated = fullDate.getFullYear();
      if (yearOrderCreated === currentYearDisplay) {
        order.orderItems.forEach((item) => {
          item.boughtAt = order.createdAt;
          if (item.shop === "boysProducts" || item.shop === "girlsProducts") {
            ordersPerShop.kidsProducts.push(item);
          } else {
            ordersPerShop[item.shop].push(item);
          }
        });
      }
    });

    return ordersPerShop;
  };

  const sumOrderSalesPerShop = (months, ordersPerShop, shop) => {
    const ordersPerShopGroupedByMonth = months;
    ordersPerShop[shop].forEach((item) => {
      const monthOrderCreated = new Date(item.boughtAt).getMonth().toString();
      ordersPerShopGroupedByMonth[shop][monthOrderCreated] +=
        item.price * item.quantity;
    });
    return Object.values(ordersPerShopGroupedByMonth[shop]);
  };

  const filterOrders = (currentYearDisplay) => {
    const months = createOrderMonthsPerShop();
    const ordersPerShop = groupOrdersByShop(currentYearDisplay);

    const menProductsGroup = sumOrderSalesPerShop(
      months,
      ordersPerShop,
      "menProducts"
    );
    const womenProductsGroup = sumOrderSalesPerShop(
      months,
      ordersPerShop,
      "womenProducts"
    );
    const kidsProductsGroup = sumOrderSalesPerShop(
      months,
      ordersPerShop,
      "kidsProducts"
    );

    setGroupedSalesProducts({
      ...groupedSalesProducts,
      menProductsGroup,
      womenProductsGroup,
      kidsProductsGroup,
    });

    return {
      menProductsGroup,
      womenProductsGroup,
    };
  };

  useEffect(() => {
    if (user === null) {
      fetchOrders(user?.token);
    }
  }, [user]);

  useEffect(() => {
    filterOrders(ordersCurrentYearDisplay);
  }, []);

  const chartDatatSet = () => {
    const dataset = [
      {
        label: "Men Shop",
        data: groupedSalesProducts.menProductsGroup,
        backgroundColor: "#20b9b4",
        borderColor: "#20b9b4",
        fill: true,
      },
      {
        label: "Women Shop",
        data: groupedSalesProducts.womenProductsGroup,
        backgroundColor: "#f697b1",
        borderColor: "#f697b1",
        fill: true,
      },
      {
        label: "Kids Shop",
        data: groupedSalesProducts.kidsProductsGroup,
        backgroundColor: "#a9b3e8",
        borderColor: "#a9b3e8",
        fill: true,
      },
    ];
    return dataset;
  };
  return (
    <SalesChartStyles>
      <Container
        label="Total Sales"
        InfoComponent={DropDown}
        componentExists={true}
        changeYearDisplayHandler={filterOrders}
      >
        <LineGraph
          datasets={chartDatatSet()}
          yAxesLabel="Amount in ( Rands )"
          tension={0}
          pointRadius={0}
        />
      </Container>
    </SalesChartStyles>
  );
};

const SalesChartStyles = styled.section``;

export default SalesChart;
