import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { FaTruck } from "react-icons/fa";
import ShippingForm from "../components/Form/ShppingForm/ShippingForm";
import Navigation from "../components/Navigation/Navigation";
import ProgressBar from "../components/ProgressBar/ProgressBar";

const Shipping = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <ShippingStyles>
        <ProgressBar />
        <div className="delivery">
          <div>
            <FaTruck />
          </div>
          <div>
            <p>Courier Delivery</p>
            <p>Take note that delivery time is within 4 - 7 working days</p>
          </div>
        </div>
        <ShippingForm />;
      </ShippingStyles>
    </Fragment>
  );
};

const ShippingStyles = styled.main`
  width: 80%;
  margin: auto;
  padding: 5rem 0rem;

  .delivery {
    padding: 8rem 0rem 0rem 0rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    div:first-child {
      font-size: 4rem;
      color: var(--dark-color);
    }

    div:last-child {
      p {
        margin-bottom: 1rem;
        font-size: 1rem;
        font-family: Montserrat-Regular;
      }

      p:first-child {
        font-size: 1.5rem;
        font-family: Montserrat-Medium;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .delivery {
      div:last-child {
        p {
          font-size: 0.9rem;
          line-height: 1.5rem;
        }

        p:first-child {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

export default Shipping;
