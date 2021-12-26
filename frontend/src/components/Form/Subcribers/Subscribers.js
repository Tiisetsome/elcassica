import React from "react";
import styled from "styled-components";

import Buttons from "../../Buttons/Buttons";

const Subscribers = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <SubscribersSection>
      <div className="form-wrapper">
        <h2>Subscribe to our news letter</h2>
        <p>And claim 10% discount on your first time purchase!</p>
        <form>
          <input name="email" type="text" placeholder="Enter Email" />
          <SubsBtn onClick={onSubmitHandler}>sign up</SubsBtn>
        </form>
      </div>
    </SubscribersSection>
  );
};

const SubscribersSection = styled.section`
  padding: 15rem 0rem;
  display: flex;
  align-items: center;
  font-family: BauerBodoniStd-Bold;
  text-transform: uppercase;
  background-color: var(--fine-grey);

  .form-wrapper {
    width: 70%;
    margin: auto;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  p {
    font-family: Montserrat-Medium;
    font-size: 1em;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--primary-grey);
  }

  input {
    height: 4rem;
    width: 100%;
    margin-bottom: 2rem;
    border: 2px black solid;
    padding-left: 2rem;
    font-size: 1rem;
    font-family: Montserrat-Medium;
  }

  @media screen and (max-width: 1024px) {
    padding: 8rem 0rem;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 0.7rem;
      margin-bottom: 1.5rem;
    }

    .form-wrapper {
      width: 60%;
    }

    input {
      height: 2rem;
      width: 100%;
      margin-bottom: 1.5rem;
      border: 1px black solid;
      padding-left: 2rem;
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 8rem 0rem;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    p {
      font-size: 0.7rem;
      margin-bottom: 1.5rem;
    }

    .form-wrapper {
      width: 60%;
    }

    input {
      height: 2rem;
      width: 100%;
      margin-bottom: 1.5rem;
      border: 1px black solid;
      padding-left: 2rem;
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 500px) {
    padding: 5rem 0rem;

    h2 {
      font-size: 1rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 0.5rem;
      margin-bottom: 1rem;
    }

    .form-wrapper {
      width: 70%;
    }

    input {
      height: 1.8rem;
      width: 100%;
      margin-bottom: 1rem;
      border: 1px black solid;
      padding-left: 1rem;
      font-size: 0.7rem;
    }
  }
`;

const SubsBtn = styled(Buttons)`
  width: 100%;
  background-color: black;
  font-family: Montserrat-Medium;

  @media screen and (max-width: 1024px) {
    padding: 0.5rem 0rem;
  }
`;

export default Subscribers;
