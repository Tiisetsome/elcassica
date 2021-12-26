import React from "react";

const Header = (props) => {
  return (
    <div className="headers">
      <h2 style={{ marginBottom: "1.5rem" }}>{props.heading}</h2>
      <p style={{ textTransform: "capitalize" }}>
        It's hard to be nice if you don't feel comfortable. Explore your true
        style with elcassica.
      </p>
    </div>
  );
};

export default Header;
