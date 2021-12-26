import React from "react";
import styled from "styled-components";

import Buttons from "../../Buttons/Buttons";
import Comments from "../../Form/Commeents/Comments";

const Reviews = (props) => {
  const getInitials = (name) => {
    return name.split("")[0].toUpperCase();
  };
  return (
    <ReviewsStyle>
      <div className="header">
        <h2>What others are saying</h2>
        <p>
          Feel free to write a review about the item and your overall experience
          of shopping with us
        </p>
      </div>
      <div className="comments-section">
        <h4> 4 Reviews</h4>
        <div className="comments-wrapper">
          <div className="comments">
            <div className="person">
              <div>
                <div className="letter-img">
                  {getInitials("Tiisetso Ntsoanee")}
                </div>
                <p>Tiisetso Ntsoane</p>
              </div>
              <p className="review-date">10/06/2021</p>
            </div>
            <h5>Great Product</h5>
            <p className="person-comment">
              I am happy with the suit. It is exactly what i was looking for
            </p>
          </div>
        </div>
        <div className="btns" style={{ width: "80%", margin: "auto" }}>
          {/* <Comments /> */}
          <CommentBtn> Comment</CommentBtn>
          <CommentBtn type={"true"}>Have A Query?</CommentBtn>
        </div>
      </div>
    </ReviewsStyle>
  );
};

const CommentBtn = styled(Buttons)`
  font-family: Montserrat-Medium;
  background-color: ${(props) => (props.type ? "#fff" : "black")};
  border: 2px black solid;
  color: ${(props) => (props.type ? "black" : "#fff")};
  text-transform: capitalize;
  font-size: 1rem;
  margin: 4rem 2rem;

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    margin: 3rem 2rem;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.7rem;
    margin: 2rem 1rem;
    padding: 0.5rem 0rem;
  }
`;

const ReviewsStyle = styled.section`
  .header {
    text-align: center;
    margin-bottom: 5rem;

    h2 {
      font-family: BauerBodoniStd-Roman;
      margin-bottom: 2rem;
    }

    p {
      fotn-family: Montserrat-Medium;
      color: var(--primary-grey);
    }
  }

  .comments-section {
    background-color: var(--fine-grey);
    h4 {
      width: 80%;
      margin: auto;
      padding-top: 5rem;
    }

    .comments-wrapper {
      width: 80%;
      margin: auto;
      padding: 2rem 0rem 2rem 0rem;

      &:last-child {
        padding-bottom: 5rem;
      }

      .comments {
        postion: relative;
        border-bottom: 0.1rem #e3e3e3 solid;
      }

      .comments .person {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        margin-bottom: 1rem;

        div .letter-img {
          display: inline-block;
          height: 3rem;
          width: 3rem;
          color: #fff;
          font-family: Montserrat-SemiBold;
          padding: 1rem;
          text-align: center;
          border-radius: 50%;
          background-color: black;
        }

        div p {
          display: inline-block;
          margin-left: 2rem;
        }
      }

      h5 {
        margin-left: 5rem;
        width: 50%;
        text-transform: uppercase;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }
    }

    .person-comment {
      margin-left: 5rem;
      margin-bottom: 2rem;
      color: var(--primary-grey);
      font-family: Montserrat-Regular;
      font-size: 0.9rem;
      width: 70%;
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      margin-bottom: 3rem;

      h2 {
        margin-bottom: 2rem;
      }

      p {
        font-size: 0.9rem;
      }
    }

    .comments-section {
      h4 {
        font-size: 0.8rem;
        padding-top: 3rem;
      }

      .comments-wrapper {
        &:last-child {
          padding-bottom: 3rem;
        }

        .comments .person {
          width: 80%;
          margin-bottom: 1rem;

          div .letter-img {
            height: 2rem;
            width: 2rem;
            padding: 0.5rem;
            border-radius: 100%;
          }

          div p {
            margin-left: 1.5rem;
            font-size: 0.9rem;
          }

          .review-date {
            font-size: 0.8rem;
          }
        }

        h5 {
          margin-left: 4.5rem;
          width: 50%;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      }

      .person-comment {
        margin-left: 4.5rem;
        margin-bottom: 2rem;
        font-size: 0.8rem;
      }
    }
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 1rem;

    .header {
      margin-bottom: 3rem;

      h2 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
      }

      p {
        font-size: 1rem;
        line-height: 1.5rem;
        width: 80%;
        margin: auto;
      }
    }

    .comments-section {
      h4 {
        font-size: 0.9rem;
        padding-top: 2.5rem;
      }

      .comments-wrapper {
        padding: 1rem 0rem 1rem 0rem;

        &:last-child {
          padding-bottom: 3rem;
        }

        .comments .person {
          margin-bottom: 1rem;
          width: 100%;

          div .letter-img {
            height: 2rem;
            width: 2rem;
            padding: 0.5rem;
            border-radius: 100%;
          }

          div p {
            margin-left: 1.5rem;
            font-size: 0.9rem;
          }

          .review-date {
            margin-top: 0.5rem;
            font-size: 0.9rem;
          }
        }

        h5 {
          margin-left: 3.5rem;
          width: 50%;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      }

      .person-comment {
        margin-left: 3.5rem;
        margin-bottom: 2rem;
        font-size: 0.9rem;
        line-height: 1.5rem;
      }
    }
  }
`;

export default Reviews;
