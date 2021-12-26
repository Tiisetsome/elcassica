import React, { useEffect, useState, useContext } from "react";
import { BiError } from "react-icons/bi";
import { useHistory } from "react-router";
import styled from "styled-components";

import UserContext from "../../../context/users/userContext";
import OrderContext from "../../../context/orders/orderContext";
import {
  isFormFieldInputEmpty,
  isFormFieldInputANumber,
  isFormFieldEmailValid,
} from "../../../HOC/validations/validationActions";

const ShippingForm = ({ user }) => {
  const userContext = useContext(UserContext);
  const orderContext = useContext(OrderContext);

  const { shippingAddress, addShippingAddress } = userContext;
  const { updateCustomerShippingAddress } = orderContext;

  const [customerShippingAddress, setCustomerShippingAddress] = useState({
    fname: shippingAddress !== null ? shippingAddress.fname : "",
    lname: shippingAddress !== null ? shippingAddress.lname : "",
    province: shippingAddress !== null ? shippingAddress.province : "",
    streetAddress:
      shippingAddress !== null ? shippingAddress.streetAddress : "",
    nextTo: shippingAddress !== null ? shippingAddress.nextTo : "",
    phoneNumber: shippingAddress !== null ? shippingAddress.phoneNumber : "",
    city: shippingAddress !== null ? shippingAddress.city : "",
    surbub: shippingAddress !== null ? shippingAddress.surbub : "",
    zipCode: shippingAddress !== null ? shippingAddress.zipCode : "",
    email: shippingAddress !== null ? shippingAddress.email : "",
  });

  const [inputErrorMessage, setInputErrorMessage] = useState(null);

  const onChangeHandler = (event, input) => {
    setCustomerShippingAddress({
      ...customerShippingAddress,
      [input]: event.target.value,
    });
  };

  const history = useHistory();

  const isFormValid = () => {
    if (isFormFieldInputEmpty(customerShippingAddress, setInputErrorMessage))
      return null;
    if (
      !isFormFieldInputANumber(
        customerShippingAddress.zipCode,
        setInputErrorMessage
      )
    )
      return null;
    if (
      !isFormFieldInputANumber(
        customerShippingAddress.phoneNumber,
        setInputErrorMessage
      )
    )
      return null;
    if (
      !isFormFieldEmailValid(
        customerShippingAddress.email,
        setInputErrorMessage
      )
    )
      return null;

    return true;
  };

  const onSubmitHandler = () => {
    if (isFormValid()) {
      addShippingAddress(customerShippingAddress);
      setInputErrorMessage(null);
      history.push("/cart/orderSummary");
    }
  };

  const updateOrderShippingAddressHandler = () => {
    if (isFormValid()) {
      const orderId = history.location?.state?.orderId;
      const shippingUpdated = updateCustomerShippingAddress(
        user.token,
        customerShippingAddress,
        orderId
      );

      if (shippingUpdated) {
        history.push("/myDashboard/");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ShippingFormStyles>
      <h5>Please enter your delivery address & contact details</h5>
      <div className="form-inputs">
        {inputErrorMessage !== null && (
          <div className="errorMsg">
            <BiError style={{ fontSize: "2rem", color: "rgb(172, 68, 68)" }} />
            <span>{inputErrorMessage}</span>
          </div>
        )}
        <div>
          <label>First Name :</label>
          <input
            type="text"
            value={customerShippingAddress.fname}
            onChange={(e) => onChangeHandler(e, "fname")}
          />
        </div>
        <div>
          <label>Last Name :</label>
          <input
            type="text"
            value={customerShippingAddress.lname}
            onChange={(e) => onChangeHandler(e, "lname")}
          />
        </div>
        <div>
          <label>State/Province :</label>
          <input
            type="text"
            value={customerShippingAddress.province}
            onChange={(e) => onChangeHandler(e, "province")}
          />
        </div>
        <div>
          <label>City :</label>
          <input
            type="text"
            value={customerShippingAddress.city}
            onChange={(e) => onChangeHandler(e, "city")}
          />
        </div>
        <div>
          <label>Surbub :</label>
          <input
            type="text"
            value={customerShippingAddress.surbub}
            onChange={(e) => onChangeHandler(e, "surbub")}
          />
        </div>
        <div>
          <label>Street Address :</label>
          <input
            type="text"
            value={customerShippingAddress.streetAddress}
            onChange={(e) => onChangeHandler(e, "streetAddress")}
          />
        </div>
        <div>
          <label>Next To :</label>
          <input
            type="text"
            value={customerShippingAddress.nextTo}
            onChange={(e) => onChangeHandler(e, "nextTo")}
          />
        </div>
        <div>
          <label>Phone Number :</label>
          <input
            type="number"
            value={customerShippingAddress.phoneNumber}
            onChange={(e) => onChangeHandler(e, "phoneNumber")}
          />
        </div>
        <div>
          <label>Zip / Postal Code :</label>
          <input
            type="text"
            value={customerShippingAddress.zipCode}
            onChange={(e) => onChangeHandler(e, "zipCode")}
          />
        </div>
        <div>
          <label>Email Address :</label>
          <input
            type="text"
            value={customerShippingAddress.email}
            onChange={(e) => onChangeHandler(e, "email")}
          />
        </div>
        {history.location?.state?.orderId ? (
          <div
            className="button"
            onClick={() => updateOrderShippingAddressHandler()}
          >
            Update Shipping Address
          </div>
        ) : (
          <div className="button" onClick={onSubmitHandler}>
            Add Shipping Address
          </div>
        )}
      </div>
    </ShippingFormStyles>
  );
};

const ShippingFormStyles = styled.form`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  font-family: Montserrat-Medium;
  font-size: 0.85rem;

  h5 {
    grid-column: 1 / span 2;
    font-size: 1.3rem;
    padding: 3rem 0rem;
    color: var(--primary-grey);
  }

  .form-inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0rem 2rem;

    .errorMsg {
      display: flex;
      gap: 1rem;
      align-items: center;
      grid-column: 1 / span 2;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border-left: 5px rgb(172, 68, 68) solid;
      background-color: rgb(255, 172, 172);

      span {
        font-family: Montserrat-Medium;
        text-transform: uppercase;
        font-weight: 600;
      }
    }

    div {
      label {
        display: block;
        margin-bottom: 1rem;
      }

      input {
        padding: 0.4rem;
        margin-bottom: 1rem;
        width: 100%;
        border: 1px #aaaaaa solid;
      }
    }

    .button {
      grid-column: 1 / span 2;
      display: block;
      width: 100%;
      padding: 0.6rem 0rem;
      margin-top: 1rem;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    font-family: Montserrat-Medium;
    font-size: 0.85rem;

    h5 {
      grid-column: unset;
      font-size: 1.3rem;
      line-height: 1.8rem;
      padding: 3rem 0rem;
      color: var(--primary-grey);
    }

    .form-inputs {
      grid-template-columns: repeat(1, 1fr);

      .errorMsg {
        grid-column: unset;
      }

      .button {
        grid-column: unset;
      }
    }
  }
`;

export default ShippingForm;
