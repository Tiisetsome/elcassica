import React from "react";
import Styled from "styled-components";
import Buttons from "../../Buttons/Buttons";
import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <PaymentStyles>
      <h3>Shipping Address</h3>
      <form>
        <div className="details">
          <div className="name">
            <label for="name">Name :</label>
            <input type="text" name="name" />
          </div>
          <div className="phone">
            <label for="phone">Phone :</label>
            <input type="number" name="phone" />
          </div>
          <div className="address">
            <label for="address">Street Address :</label>
            <input type="text" name="address" />
          </div>
          <div className="province">
            <label for="province">Province :</label>
            <input type="text" name="province" />
          </div>
          <div className="city">
            <label for="city">City/Town :</label>
            <input type="text" name="city" />
          </div>
          <div className="postal">
            <label for="postal">Postal Code :</label>
            <input type="text" name="postal" />
          </div>
          <Link to="/Checkout">
            <ContinueBtn>Continue</ContinueBtn>
          </Link>
        </div>
      </form>
    </PaymentStyles>
  );
};

const ContinueBtn = Styled(Buttons)`
  width: 100%;
  background-color: black;
  font-family: montserrat-SemiBold;
  font-size: .8rem;
  text-transform: capitalize;
  padding: .8rem;
  margin: 2rem 0rem;
`;

const PaymentStyles = Styled.section`
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
        }
    }
`;

export default Payment;
