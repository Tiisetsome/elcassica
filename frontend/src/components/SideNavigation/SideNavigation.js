import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SideNavigation = (props) => {
  const style = {
    color: "var(--primary-grey)",
    textDecoration: "none",
  };

  return (
    <SideNav>
      <div className="side-nav-wrapper">
        <div className="shop-navs">
          <h4>Shop</h4>
          <ul>
            <Link to="/men-shop" style={style}>
              <li>Suits & Jackets</li>
            </Link>
            <Link to="/men-shop/shirts" style={style}>
              <li>Shirts</li>
            </Link>
            <Link to="/men-shop/jeans" style={style}>
              <li>Jeans</li>
            </Link>
            <Link to="/men-shop/caps" style={style}>
              <li>Caps</li>
            </Link>
            <Link to="/men-shop/shoes" style={style}>
              <li>Shoes</li>
            </Link>
            <Link to="/men-shop/accessories" style={style}>
              <li>Accessories</li>
            </Link>
          </ul>
        </div>
        <div className="collection-navs">
          <h4>Collection</h4>
          <ul>
            <Link style={style} to="/men-shop/collection-2020">
              <li>Best of 2020</li>
            </Link>
            <Link style={style} to="/men-shop/sale-deals">
              <li>Hottest deals</li>
            </Link>
            <Link style={style} to="/men-shop/spring">
              <li>Spring</li>
            </Link>
            <Link style={style} to="/men-shop/summer">
              <li>Summer</li>
            </Link>
          </ul>
        </div>
        <Link style={style} to="/cart">
          <h4 className="query">Your cart</h4>
        </Link>
        <Link style={style} to="#">
          <h4>Query?</h4>
        </Link>
      </div>
    </SideNav>
  );
};

const SideNav = styled.aside`
  text-transform: uppercase;
  margin-top: 8.5rem;

  ul {
    list-style: none;
    padding: 1rem 0rem;
  }

  li {
    font-family: Montserrat-Medium;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }

  li:hover {
    color: black;
    font-weight: 600;
  }

  h4 {
    font-family: BauerBodoniStd-Bold;
    color: black;
    font-size: 0.8rem;
  }

  .query {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default SideNavigation;
