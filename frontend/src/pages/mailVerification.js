import React, { Fragment, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../context/users/userContext";
import Navigation from "../components/Navigation/Navigation";

const MailVerification = () => {
  const userContext = useContext(UserContext);

  const { updateUserAccount } = userContext;

  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const isAccountUpdated = await updateUserAccount(id);
      if (isAccountUpdated) {
        history.push("/signIn");
      }
    })();
  }, []);

  return (
    <Fragment>
      <Navigation />
      <MailVerificationStyles>
        <h1>Verifying Account</h1>
        <p>You will shortly be redirected. Please wait . . . .</p>
      </MailVerificationStyles>
    </Fragment>
  );
};

const MailVerificationStyles = styled.section`
  width: 80%;
  margin: 5rem auto;

  h1,
  p {
    margin-bottom: 1rem;
    text-align: center;
  }
`;

export default MailVerification;
