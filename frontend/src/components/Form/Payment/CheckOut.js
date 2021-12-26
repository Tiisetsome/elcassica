import React from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";

import Buttons from "../../Buttons/Buttons";

const CheckOut = () => {
  return (
    <div>
      <CheckOutSyles>
        <h3>Payment Checkout</h3>
        <form>
          <div className="details">
            <div className="name">
              <label for="name">Name On Card :</label>
              <input type="text" name="name" />
            </div>
            <div className="card-no">
              <label for="card-no">Card Number :</label>
              <input type="number" name="card-no" />
            </div>
            <div className="confirmation">
              <div className="exp-month">
                <label for="exp-month">Expiry Month :</label>
                <input type="text" name="exp-month" placeholder="MM" />
              </div>
              <div className="exp-year">
                <label for="exp-year">Expiry Year :</label>
                <input type="text" name="exp-year" placeholder="YYYY" />
              </div>
            </div>

            <div className="security">
              <label for="security">CCV :</label>
              <input type="text" name="security" />
            </div>
            <Link to="/checkout">
              <CheckOutBtn>Continue</CheckOutBtn>
            </Link>
          </div>
        </form>
      </CheckOutSyles>
    </div>
  );
};

const CheckOutBtn = Styled(Buttons)`
  width: 100%;
  background-color: black;
  font-family: montserrat-SemiBold;
  font-size: .8rem;
  text-transform: capitalize;
  padding: .8rem;
  margin: 2rem 0rem;
`;

const CheckOutSyles = Styled.section`
    padding: 5rem 0rem;
    

    h3{
        width: 80%; 
        margin:auto;
        font-family: BauerBodoniStd-Roman;
        text-transform: uppercase;
        color:var(--primary-grey);
        margin-bottom: 2rem;
    }

    form {
        width: 40%;
        margin: auto;
        background: #eeeeee;
        padding: 2rem 2rem;
        border-radius: 5px;

        .details{
            width: 80%;
            margin: auto;

            div label{
                display: block;
                margin-top: 1rem;
                font-size: .8rem;
            }

            div input{
                width: 100%;
                height: 1.8rem;
                margin-top: 1rem;
                padding: .7rem;
                letter-spacing:2px;
                color: var(--primary-grey);
                font-size: .8rem;
                border: none;
                background-color: transparent;
                border-bottom: 1px #5a5a5a solid;
            }

            .confirmation{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 4rem;
            }
        }
    }
`;

export default CheckOut;
