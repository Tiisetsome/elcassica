import React, { Fragment, useEffect } from "react";
import styled from "styled-components";

import Navigation from "../components/Navigation/Navigation";

const SignUpMessage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <SignUpMessageStyles>
        <h1>Thank You For Signing Up With Us</h1>
        <p>
          An email has been sent to your account for verification. Please log
          into your email account to complete the registration.
        </p>
      </SignUpMessageStyles>
    </Fragment>
  );
};

const SignUpMessageStyles = styled.section`
  width: 80%;
  margin: 5rem auto;

  h1,
  p {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export default SignUpMessage;
