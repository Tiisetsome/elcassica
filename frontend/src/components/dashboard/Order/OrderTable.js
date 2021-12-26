import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaPrint, FaCloudDownloadAlt, FaTrash } from "react-icons/fa";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

import Container from "../../../containers/Container";
import Filter from "../../UI/Filter";
import OrderStatusNotifier from "../../UI/OrderStatusNotifier";
import { formatDateToString } from "../../../HOC/shop/shopActions";

const OrderTable = ({ user, orders, deleteOrder }) => {
  const [filterOptions, setFilterOptions] = useState({
    active: true,
    shipped: false,
    completed: false,
  });

  const [activeLink, setActiveLink] = useState(true);
  const [activeFilterStatus, setActiveFilterStatus] = useState("processing");
  const [statusColors, setStatusColors] = useState({
    processing: "var(--green-color)",
    shipped: "var(--gold-color)",
    delivered: "var(--pink-color)",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfOrdersPerPage, setNumberOfOrdersPerPage] = useState(4);
  const [totalPagesToShow, setTotalPagesToShow] = useState(0);
  const [currentOrdersToShow, setCurrentOrdersToShow] = useState([]);

  const [orderDeleteId, setOrdereDeleteId] = useState(null);

  const filterHandler = (status, statusIndex) => {
    const filterOptionsKeys = Object.keys(filterOptions);

    const filterOptionsCopy = {
      active: false,
      shipped: false,
      completed: false,
    };

    setFilterOptions({
      ...filterOptionsCopy,
      [filterOptionsKeys[statusIndex]]: !status,
    });

    if (filterOptionsKeys[statusIndex] === "active") {
      filterOrders("processing");
    } else if (filterOptionsKeys[statusIndex] === "shipped") {
      filterOrders("shipped");
    } else if (filterOptionsKeys[statusIndex] === "completed") {
      filterOrders("delivered");
    }
  };

  const setColorHandler = (status) => {
    let color = "var(--grey-color)";

    if (status === "processing") {
      color = statusColors[status];
    } else if (status === "shipped") {
      color = statusColors[status];
    } else if (status === "delivered") {
      color = statusColors[status];
    }

    return color;
  };

  const updateFilteredOrdersAndCurrentPage = (
    orders,
    currentPageNumber,
    operator
  ) => {
    const page =
      operator === "+"
        ? currentPageNumber + 1
        : operator === "-"
        ? currentPageNumber - 1
        : 1;
    const indexOfLastOrder = page * numberOfOrdersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - numberOfOrdersPerPage;
    const productsToShow = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    setCurrentOrdersToShow(productsToShow);
    setCurrentPage(page);
  };

  const filterOrders = (orderStatus) => {
    const filteredOrders = orders.filter(
      (order) => order.currentStatus.toLowerCase() === orderStatus
    );
    const totalPages = Math.ceil(filteredOrders.length / numberOfOrdersPerPage);

    updateFilteredOrdersAndCurrentPage(filteredOrders, currentPage, null);
    setTotalPagesToShow(totalPages);
    setActiveFilterStatus(orderStatus);
  };

  const paginationHandler = (orderStatus, operator) => {
    let filteredOrders = [];

    if (currentPage <= totalPagesToShow) {
      filteredOrders = orders.filter(
        (order) => order.currentStatus.toLowerCase() === orderStatus
      );
    }

    const totalPages = Math.ceil(filteredOrders.length / numberOfOrdersPerPage);

    if (currentPage + 1 <= totalPages && operator === "+") {
      updateFilteredOrdersAndCurrentPage(filteredOrders, currentPage, operator);
    } else if (currentPage - 1 > 0 && operator === "-") {
      updateFilteredOrdersAndCurrentPage(filteredOrders, currentPage, operator);
    }
  };

  const deleteOrderHandler = (orderId) => {
    deleteOrder(orderId, user.token);
    setOrdereDeleteId(null);
  };

  const linkStyle = { textDecoration: "none", color: "#707070" };

  useEffect(() => {
    filterOrders(activeFilterStatus);
  }, []);

  return (
    <OrderTableStyles>
      <Container
        label="All Orders"
        InfoComponent={OrderStatusNotifier}
        componentExists={true}
        style={{ height: "100%" }}
      >
        <div className="filter">
          <Filter
            optionOne="Active Orders"
            optionTwo="Shipped Orders"
            optionThree="Completed Orders"
            filterHandler={filterHandler}
            filterOptions={Object.values(filterOptions)}
            activeLink={activeLink}
            renderStyles={true}
          />
        </div>
        <div className="products">
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrdersToShow.map((order) => {
                return (
                  <tr key={order._id}>
                    <td>#{order._id.slice(0, 6).toUpperCase()}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{order.totalPrice}</td>
                    <td>{formatDateToString(order.createdAt)}</td>
                    <td>12 January 2022</td>
                    <td>Paypal</td>
                    <td className="status">
                      <div
                        style={{
                          backgroundColor: setColorHandler(
                            order.currentStatus.toLowerCase()
                          ),
                        }}
                      ></div>
                    </td>
                    <td>
                      <div className="table-icons">
                        <Link
                          to={`/dashboard/order/${order._id}`}
                          style={linkStyle}
                        >
                          <span>
                            <FaEye style={{ fontSize: ".8rem" }} />
                          </span>
                        </Link>
                        <Link to="#" style={linkStyle}>
                          <span>
                            <FaPrint style={{ fontSize: ".65rem" }} />
                          </span>
                        </Link>
                        <span>
                          <FaTrash
                            style={{ fontSize: ".65rem" }}
                            onClick={() => setOrdereDeleteId(order._id)}
                          />
                        </span>
                        {orderDeleteId === order._id && (
                          <div className="delete-notice">
                            <div
                              className="cancel-wrapper"
                              onClick={() => setOrdereDeleteId(null)}
                            >
                              <div className="cancel-icon">
                                <div></div>
                                <div></div>
                              </div>
                            </div>
                            <BiError
                              style={{ fontSize: "1.4rem", color: "#bf0059" }}
                            />
                            <p>
                              Deleting this item will also delete orders
                              associated with it. Are you sure?
                            </p>
                            <p onClick={() => deleteOrderHandler(order._id)}>
                              continue
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bottom-options">
          <Link to="#" style={{ textDecoration: "none", color: "black" }}>
            <div className="download flex-2">
              <FaCloudDownloadAlt
                style={{ fontSize: "1.2rem", color: "var(--green-color)" }}
              />
              <span>Download</span>
            </div>
          </Link>
          <div className="change-btns flex-2">
            <div className="check-mark flex-2">
              <span>Showing</span>
            </div>
            <div className="check-mark flex-2">
              <div
                className="icon flex-3"
                style={{
                  backgroundColor: "#fff",
                  border: "1px #d6d6d6 solid",
                }}
              >
                <RiArrowDownSLine
                  style={{ fontSize: "1rem" }}
                  onClick={() => paginationHandler(activeFilterStatus, "-")}
                />
              </div>
              <span style={{ paddingLeft: "1rem" }}>
                {" "}
                {currentPage} of {totalPagesToShow}
              </span>
            </div>
            <div className="check-mark flex-2">
              <div
                className="icon flex-3"
                style={{
                  backgroundColor: "#fff",
                  border: "1px #d6d6d6 solid",
                }}
              >
                <RiArrowUpSLine
                  style={{ fontSize: "1rem" }}
                  onClick={() => paginationHandler(activeFilterStatus, "+")}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </OrderTableStyles>
  );
};

const OrderTableStyles = styled.section`
  margin: 3rem 0rem;

  .filter {
    margin: 2rem 1rem;
  }

  .products {
    table {
      width: calc(100% - 2rem);
      margin: 0rem auto 2rem auto;
      border: 1px #f8f8f8 solid;
      font-size: 0.7rem;

      thead {
        tr {
          th {
            padding: 0.8rem 1.5rem;
            text-align: left;
          }
        }
      }

      tbody {
        tr {
          td {
            height: 4rem;
            padding: 0rem 1.5rem;
            text-align: left;
          }

          .status {
            display: flex;
            align-items: center;
            justify-content: center;

            div {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
              background-color: var(--pink-color);
            }
          }

          .table-icons {
            gap: 0rem;
            position: relative;

            span {
              padding: 0.2rem 0.35rem;
              border-radius: 0.3rem;
              background-color: var(--light-grey-extra);
              cursor: pointer;
            }

            span:hover {
              background-color: var(--light-grey);
              transition: all 0.2s;
            }

            .delete-notice {
              width: 18rem;
              top: 3rem;
              left: -12rem;
              padding: 0.8rem 1rem;
              border-radius: 5px;
              box-shadow: 0px 0px 25px rgba(112, 112, 112, 0.3);
              background-color: #fff;
              text-align: center;
              position: absolute;
              z-index: 100;

              .cancel-wrapper {
                display: flex;
                background: red;
                position: relative;

                .cancel-icon {
                  right: 0;
                  position: absolute;
                  cursor: pointer;

                  div {
                    width: 1rem;
                    height: 2px;
                    transform: rotate(45deg);
                    background-color: var(--grey-color);
                  }

                  div:last-child {
                    transform: rotate(-45deg);
                    margin-top: -2px;
                  }
                }
              }

              p {
                margin-top: 0.5rem;
              }

              p:last-child {
                font-size: 0.75rem;
                color: #bf0059;
                cursor: pointer;
              }

              p:last-child:hover {
                font-family: Montserrat-Semibold;
              }
            }
          }
        }

        tr:nth-child(even) {
          .table-icons {
            span {
              background-color: #fff;
            }
            span:hover {
              background-color: var(--light-grey);
            }
          }
        }

        tr:nth-child(odd) {
          td {
            background-color: var(--light-grey-extra);
          }
        }
      }
    }
  }

  .bottom-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0rem 1rem;
    margin-bottom: 2rem;
    width: calc(100% - 2rem);

    .change-btns {
      gap: 1rem;
    }

    .download {
      gap: 0.8rem;

      span {
        margin-top: 0.2rem;
        padding: 0.2rem 1rem;
        border-radius: 100rem;
        font-size: 0.7rem;
        font-family: Montserrat-Medium;
        color: var(--dark-color);
        background-color: var(--light-grey-extra);
      }

      span:hover {
        background-color: var(--light-grey);
        transition: all 0.2s;
      }
    }
  }
`;

export default OrderTable;
