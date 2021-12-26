import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CartTotals = ({ totalPayable, isShippingCompleted }) => {
  return (
    <CartTotalsStyles>
      <div className="total-costs">
        <div>
          <h4>Sub-total</h4>
          <p>R {totalPayable}</p>
        </div>
        <div>
          <h4>Shipping</h4>
          <p>R 200</p>
        </div>
        <div>
          <h4>Total-Amount</h4>
          <p>R {Number(totalPayable) + 200}</p>
        </div>
        {isShippingCompleted ? (
          <div className="button">continue checkout</div>
        ) : (
          <Link
            to={{ pathname: `/signIn`, query: "/cart" }}
            style={{ textDecoration: "none" }}
          >
            <div className="button">Proceed to checkout</div>
          </Link>
        )}
      </div>
    </CartTotalsStyles>
  );
};

const CartTotalsStyles = styled.section`
  display: flex;
  justify-content: flex-end;

  .total-costs {
    div {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem 0rem;
      border-bottom: 1px #e3e3e3 solid;
      width: 25rem;

      h4 {
        width: 8rem;
        font-family: Montserrat-SemiBold;
      }

      p {
        width: 6rem;
        font-family: Montserrat-Medium;
        color: var(--primary-grey);
      }
    }

    .button {
      display: block;
      width: 100%;
      padding: 0.6rem 0rem;
      margin: 2rem 0rem;
      text-align: center;
      text-transform: uppercase;
      background: black;
      color: #fff;
      font-family: Montserrat-SemiBold;
      cursor: pointer;
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 500px) {
    justify-content: unset;

    .total-costs {
      width: 100%;
      div {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        padding: 1rem 0rem;
        border-bottom: 1px #e3e3e3 solid;
        width: 100%;

        h4 {
          width: 8rem;
          font-family: Montserrat-SemiBold;
        }

        p {
          width: 6rem;
          font-family: Montserrat-Medium;
          color: var(--primary-grey);
        }
      }

      .button {
        display: block;
        width: 100%;
        padding: 0.6rem 0rem;
        margin: 2rem 0rem;
        text-align: center;
        text-transform: uppercase;
        background: black;
        color: #fff;
        font-family: Montserrat-SemiBold;
        cursor: pointer;
        font-size: 0.9rem;
      }
    }
  }
`;

export default CartTotals;
