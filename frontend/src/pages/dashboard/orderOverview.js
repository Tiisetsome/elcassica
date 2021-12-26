import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/users/userContext";
import OrderContext from "../../context/orders/orderContext";
import OrderSummary from "../../components/dashboard/Order/OrderSummary";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import OrderTable from "../../components/dashboard/Order/OrderTable";
import OrderAnalysis from "../../components/dashboard/Order/OrderAnalysis";
import { clientValidation } from "../../HOC/validations/validationActions";

const OrderOverview = () => {
  window.scrollTo(0, 0);

  const userContext = useContext(UserContext);
  const orderContext = useContext(OrderContext);

  const { users, fetchUsers, logOutUser } = userContext;
  const { dashOrders, fetchOrders, deleteOrder } = orderContext;

  const { userLogin } = userContext;

  const history = useHistory();

  clientValidation(history, userLogin, logOutUser);

  useEffect(() => {
    if (userLogin) {
      fetchUsers(userLogin.token);
      fetchOrders(userLogin.token);
    }
  }, []);

  return (
    <OrderOverviewStylyes>
      <DashboardNavigation />
      <div className="dashboard-container">
        <OrderSummary user={userLogin} />
        <OrderTable
          user={userLogin}
          orders={dashOrders}
          deleteOrder={deleteOrder}
        />
        <OrderAnalysis users={users} orders={dashOrders} />
      </div>
    </OrderOverviewStylyes>
  );
};

const OrderOverviewStylyes = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;
  }
`;

export default OrderOverview;
