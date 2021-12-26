import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FaCartPlus, FaTshirt, FaTruck } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/users/userContext";
import OrderContext from "../../context/orders/orderContext";
import ProductsContext from "../../context/products/productsContext";
import NotificationContext from "../../context/notifications/notificationContext";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import NotificationMessage from "../../components/Notication/NotificationMessage";
import Container from "../../containers/Container";
import DropDown from "../../components/Buttons/DropDown";
import LineGraph from "../../components/charts/LineGraph";
import CircularProgress from "../../components/CircularProgress/CircularProgress";
import StatusNotifier from "../../components/UI/StatusNotifier";
import Notifications from "../../components/Notication/Notifications";
import BarGraph from "../../components/charts/BarGraph";
import { clientValidation } from "../../HOC/validations/validationActions";

const DashboardHome = () => {
  const userContext = useContext(UserContext);
  const orderContext = useContext(OrderContext);
  const productsContext = useContext(ProductsContext);
  const notificationContext = useContext(NotificationContext);

  const { users, userLogin, fetchUsers, logOutUser } = userContext;
  const { dashOrders, fetchOrders } = orderContext;
  const { products, fetchProducts } = productsContext;
  const { productsOutOfStock } = notificationContext;

  const [notifications, setNotifications] = useState({
    count: 0,
    display: true,
    itemsNotificationCounted: false,
    canceledOrderNotificationCounted: false,
    placedOrderNotificationCounted: false,
  });

  const [ordersCurrentYearDisplay, setOrdersCurrentYearDisplay] = useState(
    new Date().getFullYear()
  );
  const [customersCurrentYearDisplay, setCustomersCurrentYearDisplay] =
    useState(new Date().getFullYear());

  const history = useHistory();

  clientValidation(history, userLogin, logOutUser);

  const salesPerMonth = {};

  const addMonthsWithTotals = () => {
    for (let i = 0; i < 12; i++) {
      salesPerMonth[i] = { total: 0, totalProfit: 0 };
    }
  };

  const totalSales = () => {
    const sales = [];
    const profit = [];
    for (const month in salesPerMonth) {
      sales.push(salesPerMonth[month].total);
      profit.push(salesPerMonth[month].totalProfit);
    }
    return {
      sales,
      profit,
    };
  };

  const getTotalSalesFromOrders = (selectedYear) => {
    addMonthsWithTotals();
    dashOrders.forEach((order) => {
      const orderDate = new Date(order.updatedAt);
      const month = orderDate.getMonth();
      const year = orderDate.getFullYear();
      if (order.isPaid && year === selectedYear) {
        salesPerMonth[month].total += order.totalPrice;
        salesPerMonth[month].totalProfit += order.orderItems.reduce(
          (profit, item) => {
            return (
              profit + (item.price - item.product.stockPrice) * item.quantity
            );
          },
          0
        );
      }
    });

    return totalSales();
  };

  const chartDatatSet = () => {
    const orderTotals =
      dashOrders.length > 0
        ? getTotalSalesFromOrders(ordersCurrentYearDisplay)
        : [];
    const dataset = [
      {
        label: "Total Sales",
        data: orderTotals.sales,
        backgroundColor: "#bf0059",
        borderColor: "#bf0059",
        fill: false,
      },
      {
        label: "Total Profit",
        data: orderTotals.profit,
        backgroundColor: "#009d54",
        borderColor: "#009d54",
        fill: false,
      },
    ];
    return dataset;
  };

  const notificationHandler = (count, key) => {
    setNotifications({
      ...notifications,
      count: notifications.count + count,
      [key]: true,
    });
  };

  const disableNotificationHandler = () => {
    setNotifications({
      ...notifications,
      display: false,
    });
  };

  const getTotalOrdersDelivered = () => {
    const totalOrdersDelivered = dashOrders.reduce((totalOrders, order) => {
      if (order.status.isDelivered) {
        return totalOrders + 1;
      }
      return totalOrders;
    }, 0);
    return totalOrdersDelivered;
  };

  useEffect(() => {
    if (userLogin !== null && dashOrders.length === 0) {
      fetchOrders(userLogin.token);
    }
  }, [userLogin]);

  useEffect(() => {
    if (userLogin !== null) {
      fetchProducts();
      fetchUsers(userLogin.token);
    }
  }, [userLogin]);

  return (
    <DashboardHomeStyles>
      <DashboardNavigation />
      <div className="dashboard-container">
        {notifications.count > 0 && notifications.display && (
          <NotificationMessage
            numberOfNotifications={notifications.count}
            disableNotificationHandler={disableNotificationHandler}
          />
        )}
        <Container
          label="Store Performance"
          InfoComponent={DropDown}
          componentExists={true}
          showNotification={false}
          changeYearDisplayHandler={setOrdersCurrentYearDisplay}
        >
          <LineGraph
            datasets={dashOrders.length > 0 ? chartDatatSet() : []}
            yAxesLabel="Amount in ( Rands )"
            tension={0.35}
            pointRadius={2}
          />
        </Container>
        <section className="section-2">
          <Container label="Quick Summary" componentExists={false}>
            <div className="cards">
              <CircularProgress
                heading="Total Orders"
                count={dashOrders.length}
                color="#bf0059"
                shadowColor="0px 0px 25px rgba(191, 0, 89, 0.2)"
                Icon={FaCartPlus}
                iconSize={1.3}
              />
              <div className="line"></div>
              <CircularProgress
                heading="Total Customers"
                count={users.length}
                color="#009d54"
                shadowColor="0px 0px 25px rgba(0, 157, 84, 0.2)"
                Icon={IoIosPeople}
                iconSize={1.5}
              />
              <CircularProgress
                heading="Out Of Stock"
                count={productsOutOfStock}
                color="#927500"
                shadowColor="0px 0px 25px rgba(146, 117, 0, 0.2)"
                Icon={FaTshirt}
                iconSize={1.5}
              />
              <div className="line"></div>
              <CircularProgress
                heading="Current Couriers"
                count={getTotalOrdersDelivered()}
                color="#05496b"
                shadowColor="0px 0px 25px rgba(5, 73, 107, 0.2)"
                Icon={FaTruck}
                iconSize={1.5}
              />
            </div>
          </Container>
          <div className="notifications">
            <Container
              label="Notifications"
              componentExists={true}
              InfoComponent={StatusNotifier}
              showNotification={true}
              numberOfNotifications={notifications.count}
            />
            <Notifications
              orders={dashOrders}
              products={products}
              notifications={notifications}
              notificationHandler={notificationHandler}
              customers={users}
            />
          </div>
        </section>
        <section className="section-3">
          <Container
            label="Customers Overview"
            InfoComponent={DropDown}
            componentExists={true}
            changeYearDisplayHandler={setCustomersCurrentYearDisplay}
          >
            <div className="chart-display">
              <BarGraph
                customersCurrentYearDisplay={customersCurrentYearDisplay}
              />
              {/* <NotificationContainer
                header="Sale Suggestion"
                style={{
                  border: "1px #d6d6d6 solid",
                  height: "12rem",
                  marginRight: "1.5rem",
                  fontFamily: "Montserrat-Medium",
                  color: "#707070",
                }}
              >
                <p className="suggestion">
                  You've received a lot of traffic in March the past three years
                  compared to other months. Consider making a sale for some of
                  your products on this month. This suggestion is based on the
                  analysis made from the orders that have been placed during
                  this time period.
                </p>
              </NotificationContainer> */}
            </div>
          </Container>
        </section>
      </div>
    </DashboardHomeStyles>
  );
};

const DashboardHomeStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  .dashboard-container {
    padding: 5rem 0rem;
  }

  section {
    padding: 0rem;
  }

  .outer {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 1rem red solid;
  }

  .section-2 {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 2rem;

    .cards {
      padding: 3rem 1rem;
      display: grid;
      grid-template-columns: 1fr 1px 1fr;
      gap: 3rem;

      .line {
        width: 1px;
        height: 10rem;
        margin-top: 3rem;
        background-color: var(--light-grey);
      }
    }

    .notifications {
      color: var(--grey-color);
      font-family: Montserrat-Regular;
    }
  }

  .section-3 {
    margin-top: 3rem;

    .chart-display {
      display: flex;
      align-items: center;

      .suggestion {
        width: 20rem;
        padding: 1rem;
      }
    }
  }
`;

export default DashboardHome;
