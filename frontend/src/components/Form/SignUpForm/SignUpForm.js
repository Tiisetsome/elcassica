import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BiError } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../../../context/users/userContext";
import {
  isFormFieldEmailValid,
  isFormFieldInputEmpty,
  isPassowrdMatching,
} from "../../../HOC/validations/validationActions";

const SignUpForm = () => {
  const userContext = useContext(UserContext);

  const { userSignUp } = userContext;

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputErrorMessage, setInputErrorMessage] = useState(null);

  const onChangeHandler = (event, input) => {
    setUser({
      ...user,
      [input]: event.target.value,
    });
  };

  const history = useHistory();

  const onSubmitHandler = async () => {
    if (isFormFieldInputEmpty(user, setInputErrorMessage)) return null;
    if (!isFormFieldEmailValid(user.email, setInputErrorMessage)) return null;
    if (
      !isPassowrdMatching(
        [user.password, user.confirmPassword],
        setInputErrorMessage
      )
    )
      return null;
    const created = await userSignUp(user);

    if (created) {
      history.push("/signUp/message");
    }
  };

  const style = {
    color: "var(--primary-grey)",
    textDecoration: "none",
  };

  return (
    <SignUpFormStyles>
      <h5>Create an account</h5>
      <form className="form-inputs">
        {inputErrorMessage !== null && (
          <div className="errorMsg">
            <BiError
              style={{ fontSize: "1.5rem", color: "rgb(172, 68, 68)" }}
            />
            <span>{inputErrorMessage}</span>
          </div>
        )}
        <div>
          <label>First Name :</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => onChangeHandler(e, "name")}
          />
        </div>
        <div>
          <label>Last Name :</label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) => onChangeHandler(e, "lastName")}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => onChangeHandler(e, "email")}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => onChangeHandler(e, "password")}
          />
        </div>
        <div>
          <label>Confirm-Password :</label>
          <input
            type="password"
            value={user.confirmPassword}
            onChange={(e) => onChangeHandler(e, "confirmPassword")}
          />
        </div>
        <div className="button" onClick={onSubmitHandler}>
          continue
        </div>
        <div>
          <p>Forgot Password?</p>
          <Link to="/signIn" style={style}>
            <p>Sign In</p>
          </Link>
        </div>
      </form>
    </SignUpFormStyles>
  );
};

const SignUpFormStyles = styled.section`
  width: 80%;
  margin: 5rem auto;

  h5 {
    margin-bottom: 3rem;
    text-align: center;
    font-size: 1.5rem;
  }

  .form-inputs {
    width: 50%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0rem 2rem;

    .errorMsg {
      display: flex;
      gap: 1rem;
      align-items: center;
      padding: 0.6rem 0.8rem;
      margin-bottom: 1rem;
      border-left: 5px rgb(172, 68, 68) solid;
      background-color: rgb(255, 172, 172);

      span {
        font-family: Montserrat-Medium;
        font-size: 0.9rem;
      }
    }

    div {
      label {
        display: block;
        margin-bottom: 1rem;
        font-family: Montserrat-Medium;
        font-size: 0.9rem;
        color: var(--primary-grey);
      }

      input {
        padding: 0.6rem;
        margin-bottom: 1rem;
        width: 100%;
        border: none;
        background-color: var(--tertiary-grey);
        font-family: Montserrat-Medium;
        font-size: 0.9rem;
      }
    }

    div:last-child {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
    }

    .button {
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
    .form-inputs {
      width: 100%;

      div {
        input {
          width: 100%;
        }
      }
    }
  }
`;

export default SignUpForm;
