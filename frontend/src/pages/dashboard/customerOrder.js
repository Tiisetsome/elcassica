import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import OrderContext from "../../context/orders/orderContext";
import UserContext from "../../context/users/userContext";
import OrderCustomerDetails from "../../components/dashboard/Order/OrderCustomerDetails";
import OrderItemDetails from "../../components/dashboard/Order/OrderItemDetails";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
//

const CustomerOrder = () => {
  window.scrollTo(0, 0);
  const orderContext = useContext(OrderContext);
  const userContext = useContext(UserContext);

  const { dashOrders, updateOrderByAdmin } = orderContext;
  const { userLogin, fetchSingleUser } = userContext;

  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);

  const params = useParams();

  useEffect(() => {
    if (dashOrders.length > 0) {
      const customerOrder = dashOrders.find((order) => order._id === params.id);
      setOrder(customerOrder);
    }
  }, []);

  useEffect(() => {
    if (userLogin && order) {
      const fetchUser = async () => {
        const fetchedUser = await fetchSingleUser(userLogin.token, order.user);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      };
      fetchUser();
    }
  }, [order, userLogin]);

  return (
    <CustomerOrderStyles>
      <DashboardNavigation />
      <div className="dashboard-container">
        <div className="order-details-wrapper">
          <OrderItemDetails
            orderId={params.id}
            orderItems={order ? order.orderItems : order}
            orderDate={order ? order.createdAt : null}
            cancellationStatus={order ? order.cancellation.status : null}
          />
          <OrderCustomerDetails
            order={order}
            orderId={params.id}
            user={user}
            token={userLogin?.token}
            updateOrderHandler={updateOrderByAdmin}
          />
        </div>
      </div>
    </CustomerOrderStyles>
  );
};

const CustomerOrderStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.75rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;

    .order-details-wrapper {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 1.5rem;
    }
  }
`;

export default CustomerOrder;
