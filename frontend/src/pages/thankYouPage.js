import React, { Fragment, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation";

const ThankYouPage = () => {
  const history = useHistory();
  if (typeof history.location.state === "undefined") {
    history.replace("/");
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <ThankYouNoteStyles>
        <h1>Thank You For Shhopping With Us</h1>
        <p>
          Your order has been placed and will be processed soon. A confirmation
          for your order has been sent to your email.
        </p>
        <div className="buttons">
          <Link to="/main-shop/" style={{ textDecoration: "none" }}>
            <div className="shopping">
              <BsArrowLeft style={{ fontSize: "1rem" }} />
              <p>Contnue shopping</p>
            </div>
          </Link>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div className="dashboard">
              <p>Check Order</p>
              <BsArrowRight style={{ fontSize: "1rem" }} />
            </div>
          </Link>
        </div>
      </ThankYouNoteStyles>
    </Fragment>
  );
};

const ThankYouNoteStyles = styled.section`
  width: 80%;
  margin: 5rem auto;

  h1,
  p {
    margin-bottom: 1rem;
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    .shopping,
    .dashboard {
      margin: 1rem 0rem;
      width: 12rem;
      background-color: var(--fine-grey);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.5rem 0rem;
      cursor: pointer;

      p {
        color: var(--primary-grey);
        font-family: Montserrat-Medium;
        font-size: 0.8rem;
        margin-bottom: 0rem;
      }
    }

    .dashboard {
      background-color: black !important;
      color: #fff;

      p {
        color: var(--tertiary-grey);
      }
    }
  }

  @media screen and (max-width: 500px) {
    .buttons {
      flex-direction: column;
      align-items: center;
      gap: 0rem;
    }
  }
`;

export default ThankYouPage;
