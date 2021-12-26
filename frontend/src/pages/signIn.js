import React, { Fragment, useEffect } from "react";
import SignInForm from "../components/Form/SignInForm/SignInForm";
import Navigation from "../components/Navigation/Navigation";

const SignIn = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <SignInForm />;
    </Fragment>
  );
};

export default SignIn;
