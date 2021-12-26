import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/users/userContext";
import SalesChart from "../../components/dashboard/Sales/SalesChart";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import SalesBreakdown from "../../components/dashboard/Sales/SalesBreakdown";
import { clientValidation } from "../../HOC/validations/validationActions";

const Sales = () => {
  window.scrollTo(0, 0);
  const userContext = useContext(UserContext);
  const { userLogin, logOutUser } = userContext;

  const history = useHistory();

  clientValidation(history, userLogin, logOutUser);

  return (
    <SalesStyles>
      <DashboardNavigation />
      <div className="dashboard-container">
        <SalesChart user={userLogin} />
        <SalesBreakdown />
      </div>
    </SalesStyles>
  );
};

const SalesStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;
  }
`;

export default Sales;
