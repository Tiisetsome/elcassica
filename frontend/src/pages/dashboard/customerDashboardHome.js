import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/users/userContext";
import OrderContext from "../../context/orders/orderContext";
import ProductsContext from "../../context/products/productsContext";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import OrderStatusNotifier from "../../components/UI/OrderStatusNotifier";
import Container from "../../containers/Container";
import { formatDateToString } from "../../HOC/shop/shopActions";
import OrderItemDetails from "../../components/dashboard/Order/OrderItemDetails";
import Tracking from "../../components/UI/Tracking";
import { customerDashboardValidation } from "../../HOC/validations/validationActions";

const CustomerDashboardHome = () => {
  const userContext = useContext(UserContext);
  const orderContext = useContext(OrderContext);
  const productsContext = useContext(ProductsContext);

  const { shippingAddress, userLogin, addShippingAddress, logOutUser } =
    userContext;
  const { customerDashOrders, fetchSpecificCustomerOrders, cancelOrder } =
    orderContext;

  const history = useHistory();

  customerDashboardValidation(history, userLogin, logOutUser);

  const [orderDetails, setOrderDetails] = useState({
    selectedOrderId: null,
    orderCreatedDate: null,
    orderToShow: [],
  });

  const [isCustomerCancellingOrder, setIsCustomerCancellingOrder] =
    useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const getStatusColor = (status) => {
    const colors = {
      processing: "#009d54",
      shipped: "#927500",
      delivered: "#bf0059",
    };
    return colors[status.toLowerCase()];
  };

  const orderItemsHandler = (orderId, order, orderDate) => {
    setOrderDetails({
      selectedOrderId: orderId,
      orderCreatedDate: orderDate,
      orderToShow: order,
    });
  };

  const resetOrderDetailsHandler = () => {
    setOrderDetails({
      selectedOrderId: null,
      orderCreatedDate: null,
      orderToShow: [],
    });
  };

  const updateShippingAddressHandler = (shippingAddress, orderItems) => {
    addShippingAddress(shippingAddress);
    history.push({
      pathname: "/cart/shipping/",
      state: {
        orderId: orderDetails.selectedOrderId,
        fromCustomerDash: true,
      },
    });
  };

  const cancelOrderHandler = async () => {
    const reasonForCancelling = {
      reason: cancellationReason,
    };
    const orderCancelled = await cancelOrder(
      userLogin.token,
      reasonForCancelling,
      orderDetails.selectedOrderId,
      orderDetails.orderToShow.user
    );
    if (orderCancelled) {
      resetOrderDetailsHandler();
    }
  };

  const onChangeHander = async (e) => {
    setCancellationReason(e.target.value);
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    if (userLogin?.token) {
      fetchSpecificCustomerOrders(userLogin?.token, userLogin?.id);
    }
  }, [userLogin]);

  return (
    <CustomerDashboardHomeStyles>
      {orderDetails.orderToShow?.orderItems?.length > 0 && (
        <div
          className="backdrop"
          onClick={() => resetOrderDetailsHandler()}
        ></div>
      )}
      <DashboardNavigation />
      <div className="dashboard-container">
        <Container
          label="My Recent Orders"
          InfoComponent={OrderStatusNotifier}
          componentExists={true}
        >
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Num Of Items</th>
                <th>Total Price</th>
                <th>Date Purchased</th>
                <th>Expected Delivery Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerDashOrders.length > 0 &&
                customerDashOrders.map((order) => {
                  return (
                    !order.cancellation?.status && (
                      <tr key={order._id}>
                        <td>#{order._id.slice(0, 6).toUpperCase()}</td>
                        <td>{order.orderItems.length}</td>
                        <td>R {order.totalPrice}</td>
                        <td>{formatDateToString(order.createdAt)}</td>
                        <td>20 June 2021</td>
                        <td className="status flex-3">
                          <div
                            style={{
                              backgroundColor: getStatusColor(
                                order.currentStatus
                              ),
                            }}
                          ></div>
                        </td>
                        <td
                          onClick={() =>
                            orderItemsHandler(order._id, order, order.createdAt)
                          }
                        >
                          <span>view</span>
                        </td>
                      </tr>
                    )
                  );
                })}
            </tbody>
          </table>
        </Container>
      </div>
      {orderDetails.orderToShow?.orderItems?.length > 0 && (
        <div className="order-details">
          <div className="order-details-wrapper">
            <OrderItemDetails
              orderId={orderDetails.selectedOrderId}
              orderItems={orderDetails.orderToShow.orderItems}
              orderDate={orderDetails.orderCreatedDate}
            />
            <Container
              label={`Order #${orderDetails.selectedOrderId
                ?.slice(0, 6)
                .toUpperCase()}`}
              componentExists={false}
              style={{ height: "100%" }}
            >
              <div className="user-addresses">
                <div className="billing">
                  <span className="heading">Billing Address</span>
                  <div>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.province}
                    </span>
                    <span>{orderDetails.orderToShow.shippingAddress.city}</span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.streetAddress}
                    </span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.surbub}
                    </span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.zipCode}
                    </span>
                    <span>
                      {formatDateToString(orderDetails.orderCreatedDate)}
                    </span>
                  </div>
                  <div className="email">
                    <span>Email Address :</span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.email}
                    </span>
                  </div>
                  <div className="phone">
                    <span>Phone :</span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.phoneNumber}
                    </span>
                  </div>
                </div>
                <div className="shipping">
                  <span className="heading">Shipping Address</span>
                  <div>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.province}
                    </span>
                    <span>{orderDetails.orderToShow.shippingAddress.city}</span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.streetAddress}
                    </span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.surbub}
                    </span>
                    <span>
                      {orderDetails.orderToShow.shippingAddress.zipCode}
                    </span>
                    <span>
                      {formatDateToString(orderDetails.orderCreatedDate)}
                    </span>
                  </div>
                </div>
                <div className="shipping">
                  <span className="heading">Order Tracking</span>
                  <Tracking orderTracking={orderDetails.orderToShow.status} />
                </div>
              </div>
              {orderDetails.orderToShow.currentStatus.toLowerCase() ===
                "processing" && (
                <div className="actions">
                  <div
                    className="button"
                    onClick={() =>
                      updateShippingAddressHandler(
                        orderDetails.orderToShow.shippingAddress,
                        orderDetails.orderToShow.orderItems
                      )
                    }
                  >
                    Update Addresses
                  </div>
                  <div
                    className="button"
                    onClick={() =>
                      setIsCustomerCancellingOrder(!isCustomerCancellingOrder)
                    }
                  >
                    Cancel Order
                  </div>
                  {isCustomerCancellingOrder && (
                    <form>
                      <div>
                        <label>Reason :</label>
                        <textarea
                          type="text"
                          value={cancellationReason}
                          onChange={onChangeHander}
                        ></textarea>
                        <div
                          className="button"
                          onClick={() => cancelOrderHandler()}
                        >
                          Submit
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </Container>
          </div>
        </div>
      )}
    </CustomerDashboardHomeStyles>
  );
};

const CustomerDashboardHomeStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;

    table {
      width: calc(100% - 4rem);
      margin: 2rem 2rem;
      border: 1px #d6d6d6 solid;
      font-size: 0.7rem;

      thead {
        tr {
          th {
            padding: 0.8rem 0rem;
          }
        }
      }

      tbody {
        tr {
          td {
            height: 5rem;
            padding: 0rem 0rem;
            text-align: center;
          }

          td:last-child {
            span {
              padding: 0.4rem 1rem;
              border-radius: 2px;
              background-color: var(--light-grey);
              font-family: Montserrat-Medium;
              cursor: pointer;
            }
          }

          td:last-child:hover {
            span {
              color: #fff;
              background-color: var(--light-blue-color);
              transition: all 0.2s;
            }
          }

          .status {
            div {
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background-color: var(--green-color);
            }
          }

          td:first-child {
            .img-container {
              width: 3.5rem;
              height: 3.5rem;
              overflow: hidden;
              border-radius: 50%;
              background-color: var(--light-grey);

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
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

  .order-details {
    width: 80%;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    position: absolute;
    z-index: 10;

    .order-details-wrapper {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: 1.5rem;

      .user-addresses {
        padding: 2rem 1rem 2rem 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        border-bottom: 1px #f8f8f8 solid;

        .billing,
        .shipping {
          .heading {
            display: block;
            font-size: 0.75rem;
            font-family: Montserrat-Semibold;
            margin-bottom: 2rem;
          }

          span {
            display: block;
            margin-bottom: 1rem;
          }

          .email,
          .phone {
            span:first-child {
              font-family: Montserrat-Medium;
              margin-top: 2rem;
            }
          }
        }
      }

      .actions {
        margin-top: 1.25rem;
        padding: 1rem;
        display: flex;
        gap: 1rem;
        position: relative;

        .button {
          margin-bottom: 1rem;
          padding: 0.5rem;
          width: 10rem;
          background-color: #e96d6d;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }

        .button:first-child {
          background-color: black;
        }

        form {
          width: 22rem;
          top: -15rem;
          right: 2rem;
          position: absolute;
          box-shadow: 0px 0px 25px rgba(112, 112, 112, 0.15);

          div {
            width: 100%;
            padding: 1.5rem;
            color: var(--grey-color);
            background-color: #fff;
            text-align: left;

            label {
              display: block;
              margin-bottom: 0.8rem;
            }

            textarea {
              width: 100%;
              height: 8rem;
              padding: 0.5rem;
              margin-bottom: 0.5rem;
              font-size: 0.8rem;
              line-height: 1.2rem;
              outline: none;
              color: var(--grey-color);
              font-family: Montserrat-Regular;
              border: 1px #d6d6d6 solid;
            }
          }

          .button {
            width: 100%;
            margin-bottom: 0rem;
          }
        }
      }
    }
  }
  .backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    position: absolute;
    background: black;
    opacity: 0.8;
    z-index: 5;
  }
`;

export default CustomerDashboardHome;
