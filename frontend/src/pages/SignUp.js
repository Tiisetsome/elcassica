import React, { Fragment, useEffect } from "react";
import Navigation from "../components/Navigation/Navigation";
import SignUpForm from "../components/Form/SignUpForm/SignUpForm";

const SignUp = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <SignUpForm />
    </Fragment>
  );
};

export default SignUp;
