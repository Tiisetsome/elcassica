import React, { Fragment, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BsPower } from "react-icons/bs";

import UserContext from "../../context/users/userContext";

const DashboardNavigation = () => {
  const userContext = useContext(UserContext);

  const { userLogin, logOutUser } = userContext;

  const [menuToggle, setMenuToggle] = useState(false);

  const history = useHistory();

  const signOut = () => {
    logOutUser();
    history.push("/");
  };

  const style = {
    textDecoration: "none",
    color: "black",
    pading: "0rem",
    margin: "0rem",
  };
  return (
    <Fragment>
      <DashboardNavigationStyles className="dasboard-nav-wrapper">
        <div className="container">
          <Link to="/" style={style}>
            <h4 className="shop-name">Elcassica</h4>
          </Link>
          <ul>
            {userLogin?.isAdmin ? (
              <Fragment>
                <Link to="/dashboard" style={style}>
                  <li>Overview</li>
                </Link>
                <Link
                  to={{
                    pathname: "/dashboard/orderOverview",
                    query: "/dashboard",
                  }}
                  style={style}
                >
                  <li>Orders</li>
                </Link>
                <Link to="/dashboard/sales" style={style}>
                  <li>Sales</li>
                </Link>
                <Link to="/dashboard/products" style={style}>
                  <li>Products</li>
                </Link>
                <Link to="/dashboard/users" style={style}>
                  <li>Users</li>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/dashboard" style={style}>
                  <li>Orders</li>
                </Link>
                <Link to="/dashboard" style={style}>
                  <li>My Account</li>
                </Link>
              </Fragment>
            )}
            <li className="img-container">T</li>
            <div className="logout flex-2">
              <div className="drop-down flex-2">
                <li>Timothy</li>
                {menuToggle ? (
                  <IoMdArrowDropup
                    style={{
                      fontSize: "2.8rem",
                      color: "#d6d6d6",
                      cursor: "pointer",
                    }}
                    onClick={() => setMenuToggle(!menuToggle)}
                  />
                ) : (
                  <IoMdArrowDropdown
                    style={{
                      fontSize: "2.8rem",
                      color: "#d6d6d6",
                      cursor: "pointer",
                    }}
                    onClick={() => setMenuToggle(!menuToggle)}
                  />
                )}
              </div>
              {menuToggle && (
                <li className="more-details">
                  <div>
                    <span>{userLogin?.isAdmin ? "Admin" : "Customer"}</span>
                    <span onClick={signOut}>
                      <BsPower style={{ fontSize: "1rem" }} />
                      Logout
                    </span>
                  </div>
                </li>
              )}
            </div>
          </ul>
        </div>
      </DashboardNavigationStyles>
    </Fragment>
  );
};

const DashboardNavigationStyles = styled.nav`
  padding: 2rem 0rem;
  background-color: var(--dark-color);
  color: var(--light-grey-extra);

  .container {
    max-width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .shop-name {
      width: 12rem;
      padding: 8px 0rem;
      font-size: 1.2rem;
      letter-spacing: 0.1rem;
      color: var(--light-grey);
      border: 1px solid rgb(0, 0, 0);
      border-color: var(--light-grey);
      border-radius: 5px;
      text-align: center;
      text-transform: uppercase;
      font-family: "BauerBodoniStd-Roman";
    }

    ul {
      display: flex;
      justify-content: space-between;
      gap: 1.8rem;
      list-style: none;
      align-items: center;
      font-size: 0.8rem;

      li {
        color: var(--light-grey);
        font-family: Montserrat-Regular;
        font-size: 0.7rem;
      }

      .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        margin-left: 2rem;
        border-radius: 50rem;
        font-family: Montserrat-Semibold;
        font-size: 1rem;
        background-color: var(--light-grey);
        color: var(--dark-color);
      }

      .logout {
        flex-direction: column;
        gap: 0rem;
      }

      li.more-details {
        div {
          flex-direction: column;
          margin-left: -2rem;

          span {
            display: block;
            margin-bottom: 0.5rem;
          }

          span:last-child {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
          }
        }
      }

      .drop-down {
        gap: 0.5rem;
      }
    }
  }
`;

export default DashboardNavigation;
