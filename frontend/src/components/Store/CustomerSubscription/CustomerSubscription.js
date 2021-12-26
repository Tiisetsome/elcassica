import React from "react";
import styled from "styled-components";

import Subscibe from "../../Form/Subcribers/SubscriberShop";

const CustomerSubscription = () => {
  return (
    <Review>
      <div className="review-container">
        <div className="subscriber">
          <h4>Get in the know</h4>
          <p>
            Be the first one to know about the latest arrivals and promotions by
            subscribing to our news-letter plus a bonus of 10% off on your first
            purchase with us.
          </p>
          <Subscibe />
        </div>
        <div className="improvement">
          <h4>Help us improve</h4>
          <p>Take a quick survey about your visit today</p>
          <h5>Quick Review</h5>
        </div>
        <div className="chat">
          <h4>Talk to us</h4>
          <p>Live Chat</p>
        </div>
      </div>
    </Review>
  );
};

const Review = styled.section`
  padding: 10rem 0rem;
  background-color: var(--fine-grey);

  .review-container {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;

    .subscriber {
      width: 35%;
    }

    h4 {
      text-transform: uppercase;
      margin-bottom: 2rem;
      font-size: 1.2rem;
    }

    p {
      font-family: Montserrat-Regular;
      margin-bottom: 2rem;
      font-size: 1rem;
      line-height: 1.8rem;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 5rem 0rem;

    .review-container {
      h4 {
        margin-bottom: 1.5rem;
        font-size: 0.9rem;
      }

      p {
        font-size: 0.7rem;
        line-height: 1.2rem;
        margin-bottom: 1rem;
      }
    }
  }

  @media screen and (max-width: 500px) {
    padding: 5rem 0rem;

    .review-container {
      display: grid;
      grid-template-columns: 1fr;

      h4 {
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
      }

      p {
        font-size: 0.9rem;
        line-height: 1.5rem;
      }

      .subscriber {
        width: 100%;
        margin-bottom: 1.5rem;
      }
    }

    h5 {
      font-size: 0.8rem !important;
    }

    .chat {
      display: none;
    }
  }
`;

export default CustomerSubscription;
