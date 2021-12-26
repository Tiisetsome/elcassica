import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  const style = {
    textDecoration: "none",
  };
  return (
    <FooterSection>
      <div className="footer-wrapper">
        <div className="help-links">
          <h3>Help</h3>
          <ul>
            <Link to="#" style={style}>
              <li>Contact</li>
            </Link>
            <Link to="#" style={style}>
              <li>About Us</li>
            </Link>
            <Link to="#" style={style}>
              <li>Your Account</li>
            </Link>
            <Link to="#" style={style}>
              <li>Shipping</li>
            </Link>
            <Link to="#" style={style}>
              <li>Returns</li>
            </Link>
            <Link to="#" style={style}>
              <li>FAQ</li>
            </Link>
          </ul>
        </div>
        <div className="quick-links">
          <h3>Qick Links</h3>
          <ul>
            <Link style={style} to="/men-shop">
              {" "}
              <li>Men</li>
            </Link>
            <Link style={style} to="/women-shop">
              <li>Women</li>
            </Link>
            <Link style={style} to="/kids-shop">
              {" "}
              <li>Kids</li>
            </Link>
            <Link style={style} to="/accessories-shop">
              {" "}
              <li>Accessories</li>
            </Link>
          </ul>
        </div>
        <div className="store-info">
          <h3>Shop</h3>
          <ul>
            <Link to="#" style={style}>
              <li>Store locator</li>
            </Link>
            <Link to="#" style={style}>
              <li>Gift cards</li>
            </Link>
            <Link to="#" style={style}>
              <li>Sale</li>
            </Link>
          </ul>
        </div>
        <div className="social-links">
          <h3>Social Media</h3>
          <ul>
            <Link to="#" style={style}>
              <li>Instagram</li>
            </Link>
            <Link to="#" style={style}>
              <li>Twitter</li>
            </Link>
            <Link to="#" style={style}>
              <li>Facebook</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="footer">
        <Link to="#" style={{ ...style, color: "#fff" }}>
          <p>All rights reserved &copy; 2020 | Designed by Tiisetso</p>
        </Link>
        <Link to="#" style={{ ...style, color: "#fff" }}>
          <p>Privacy Policy</p>
        </Link>
        <Link to="#" style={{ ...style, color: "#fff" }}>
          <p>Terms and conditons</p>
        </Link>
      </div>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  font-family: Montserrat-Medium;
  width: 100%;
  background: var(--footer-grey);
  color: #fff;
  text-transform: uppercase;

  .footer-wrapper {
    padding: 5rem 0rem;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;

    li {
      color: #fff;
      text-decoration: none;
    }

    ul {
      list-style: none;
      margin-top: 2rem;
      line-height: 2rem;
    }

    li {
      font-family: Montserrat-Regular;
      font-size: 0.8rem;
    }
  }

  .footer {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;

    p {
      font-family: Montserrat-Regular;
      font-size: 0.7rem;
      margin-bottom: 2rem;
    }
  }

  @media screen and (max-width: 1024px) {
    .footer-wrapper {
      padding: 5rem 0rem 3rem 0rem;

      h3 {
        font-size: 0.8rem;
      }

      ul {
        line-height: 1.5rem;
      }

      li {
        font-size: 0.6rem;
      }
    }

    .footer {
      p {
        font-size: 0.5rem;
        margin-bottom: 2rem;
        tex-align: center;
      }

      p:nth-child(2),
      p:nth-child(3) {
        display: none;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .footer-wrapper {
      flex-direction: column;
      width: 70%;
    }

    h3 {
      font-size: 0.7rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    ul {
      margin-top: 1rem;
    }

    .footer {
      p {
        line-height: 1rem;
      }
    }
  }
`;

export default Footer;
