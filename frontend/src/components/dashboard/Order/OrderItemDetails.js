import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import Container from "../../../containers/Container";
import { RiCheckLine, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { formatDateToString } from "../../../HOC/shop/shopActions";

const OrderItemDetails = ({
  orderId,
  orderItems,
  orderDate,
  cancellationStatus,
}) => {
  const [item, setItem] = useState(null);
  const [start, setStart] = useState(0);
  const [itemsLimit, setItemsLimit] = useState(null);

  const test = (itemCount, operator) => {
    if (itemCount < itemsLimit - 1 && operator === "+") {
      setItem(orderItems[itemCount + 1]);
      setStart(itemCount + 1);
    } else if (itemCount >= 1 && operator === "-") {
      setItem(orderItems[itemCount - 1]);
      setStart(itemCount - 1);
    }
  };

  useEffect(() => {
    if (orderItems) {
      setItem(orderItems[0]);
      setItemsLimit(orderItems.length);
    }
  }, [orderItems]);

  return (
    <OrderItemDetailsStyles>
      <Container
        label={`Order #${orderId?.slice(0, 6).toUpperCase()}`}
        componentExists={false}
        style={{ height: "100%" }}
      >
        {item && (
          <Fragment>
            <div className="item-details-wrapper">
              {cancellationStatus && (
                <div className="cancellation-msg">
                  This order has been cancelled.
                </div>
              )}
              <p>
                Order Date : {orderDate ? formatDateToString(orderDate) : null}{" "}
                18:08pm
              </p>
              <div className="image-container">
                <img src={item.imageUrl} />
              </div>
              <p className="item-name">{item.name}</p>
              <div className="item-details">
                <div>
                  <span>Size : </span>
                  <span>{item.size}</span>
                </div>
                <div>
                  <span>Color : </span>
                  <span>{item.color}</span>
                </div>
                <div>
                  <span>Quantity : </span>
                  <span>{item.quantity}</span>
                </div>
                <div>
                  <span>Total : </span>
                  <span>R {item.quantity * item.price}</span>
                </div>
                <div>
                  <span>Payment Method : </span>
                  <span>Paypal</span>
                </div>
              </div>
              {itemsLimit > 1 && (
                <div className="bottom-options flex-2">
                  <div className="btn-options flex-2">
                    <div className="btn flex-2">
                      <div
                        className="icon flex-3"
                        style={{
                          border: "1px #d6d6d6 solid",
                        }}
                        onClick={() => test(start, "-")}
                      >
                        <RiArrowDownSLine style={{ fontSize: "1rem" }} />
                      </div>
                    </div>
                    <span>
                      {start + 1} of {itemsLimit}
                    </span>
                    <div className="btn flex-2">
                      <div
                        className="icon flex-3"
                        style={{
                          border: "1px #d6d6d6 solid",
                        }}
                        onClick={() => test(start, "+")}
                      >
                        <RiArrowUpSLine style={{ fontSize: "1rem" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </Container>
    </OrderItemDetailsStyles>
  );
};

const OrderItemDetailsStyles = styled.div`
  height: 100%;
  opacity: 1 !important;
  .item-details-wrapper {
    padding: 2rem 1rem;

    .cancellation-msg {
      padding: 0.5rem;
      margin-bottom: 1rem;
      font-family: Montserrat-Semibold;
      background: rgb(255, 174, 174);
    }

    p {
      margin-bottom: 1rem;
      line-height: 1.2rem;
    }

    .image-container {
      width: 100%;
      height: 14rem;
      margin: 2rem auto;
      background-color: var(--light-grey);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .item-name {
      font-family: Montserrat-Semibold;
    }

    .item-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      width: 100%;

      div {
        margin-bottom: 1.5rem;

        span:first-child {
          margin-right: 0.5rem;
          font-family: Montserrat-Semibold;
        }
      }

      div:last-child {
        grid-column: 1 / span 2;
      }
    }
    .bottom-options {
      justify-content: flex-end;
      align-items: center;
      margin-top: 0rem;
      width: calc(100%);
      padding: 0.8rem 0rem;
      border-top: 1px #f1f1f1 solid;
      border-bottom: 1px #f1f1f1 solid;

      .btn-options {
        gap: 0.5rem;
      }

      .icon:hover {
        background-color: var(--light-blue-color);
        color: #fff;
        border: 1px #20b9b4 solid !important;
        transition: all 0.2s;
      }

      .btns {
        gap: 1rem;
      }
    }
  }
`;

export default OrderItemDetails;
