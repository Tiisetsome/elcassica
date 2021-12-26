export const isFormFieldInputEmpty = (formInputs, setInputErrorMessage) => {
  for (const input in formInputs) {
    if (formInputs[input].trim().length === 0) {
      setInputErrorMessage("Please fill in all fields!");
      return true;
    }
  }
  return false;
};

export const isImagesFieldInputEmpty = (formInput, setInputErrorMessage) => {
  if (formInput.length === 0) {
    setInputErrorMessage("Please select product images!");
    return true;
  }

  return false;
};

export const isVariationInputEmpty = (formInput, setInputErrorMessage) => {
  if (formInput.length === 0) {
    setInputErrorMessage("Please fill in all fields");
    return true;
  }

  return false;
};

export const isFormFieldInputANumber = (formInput, setInputErrorMessage) => {
  const regex = !/^[0-9]+$/.test(formInput);
  if (regex) {
    setInputErrorMessage("Zip code and phone number must be valid numbers!");
    return false;
  }
  return true;
};

export const isFormFieldEmailValid = (formInput, setInputErrorMessage) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput);
  if (!regex) {
    setInputErrorMessage("Please enter a valid email!");
    return false;
  }
  return true;
};

export const clientValidation = (history, userLogin, userLogout) => {
  if (userLogin === null) {
    history.push("/signIn", { query: "/dashboard" });
  } else if (userLogin.isAdmin === false) {
    userLogout();
  } else if (userLogin.isEmailConfirmed === false) {
    history.push("/signIn", { query: "/dashboard" });
  }
};

export const customerDashboardValidation = (history, userLogin, userLogout) => {
  if (userLogin === null && !userLogin?.isEmailConfirmed) {
    history.push("signIn");
  }
};

export const isPassowrdMatching = (formInputs, setInputErrorMessage) => {
  if (formInputs[0] !== formInputs[1]) {
    setInputErrorMessage("Password does not match!");
    return false;
  }
  return true;
};
