import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { BiError } from "react-icons/bi";
import UserContext from "../../../context/users/userContext";
import {
  isFormFieldEmailValid,
  isFormFieldInputEmpty,
} from "../../../HOC/validations/validationActions";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const userContext = useContext(UserContext);

  const { userLogin, getUserProfile } = userContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [inputErrorMessage, setInputErrorMessage] = useState(null);

  const history = useHistory();

  const onChangeHandler = (event, input) => {
    setUser({
      ...user,
      [input]: event.target.value,
    });
  };

  const onSubmitHandler = () => {
    if (isFormFieldInputEmpty(user, setInputErrorMessage)) return null;
    if (!isFormFieldEmailValid(user.email, setInputErrorMessage)) return null;
    getUserProfile(user);
    setInputErrorMessage(null);
  };

  useEffect(() => {
    if (userLogin !== null) {
      if (
        history.location?.query !== "undefined" &&
        history.location?.query === "/cart"
      ) {
        history.push("/cart/shipping/");
      } else if (
        history.location?.state?.query !== "undefined" &&
        history.location?.state?.query === "/dashboard"
      ) {
        if (userLogin.isAdmin) {
          history.push("/dashboard");
        } else {
          history.push("/myDashBoard");
        }
      } else {
        history.replace("/");
      }
    }
  }, [userLogin]);

  const style = {
    color: "var(--primary-grey)",
    textDecoration: "none",
  };

  return (
    <SignInFormStyles>
      <h5>Sign In</h5>
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
          <label>Email Address :</label>
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
        <div className="button" onClick={onSubmitHandler}>
          continue
        </div>
        <div>
          <p>Forgot Password?</p>
          <Link to="/signUp" style={style}>
            <p>Sign Up</p>
          </Link>
        </div>
      </form>
    </SignInFormStyles>
  );
};

const SignInFormStyles = styled.section`
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
      width: 100%;
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

export default SignInForm;
