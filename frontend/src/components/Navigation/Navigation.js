import React, { Fragment, useState, useEffect, useContext } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import gsap from "gsap";
import { Power3 } from "gsap";
import ProductsContext from "../../context/products/productsContext";

const Navigation = () => {
  const productsContext = useContext(ProductsContext);

  const { cartItems } = productsContext;

  useEffect(() => {
    const tl = new gsap.timeline();

    tl.to(".mobile", {
      duration: 1,
      width: "100%",
      ease: Power3.easeOut,
    }).to(
      ".mobile-links",
      {
        opacity: 1,
      },
      "-= 0.8"
    );
  });

  const testgg = () => {
    const tl = new gsap.timeline();

    tl.to(".mobile", {
      duration: 1,
      width: "0%",
    }).to(
      ".mobile-links",
      {
        opacity: 0,
        ease: Power3.easeOut,
      },
      "-= 0.5"
    );
  };

  //State
  const [menu, setMenu] = useState(true);
  const [showLinks, setShowLinks] = useState(false);
  const [menShopLinks, setMenShopLinks] = useState(false);
  const [womenShopLinks, setWomenShopLinks] = useState(false);
  const [kidsShopLinks, setKidsShopLinks] = useState(false);
  const [accessoriesShopLinks, setAccessoriesShopLinks] = useState(false);
  const [expand, setExpand] = useState(false);
  const [expandWomen, setExpandWomen] = useState(false);
  const [expandKids, setExpandKids] = useState(false);
  const [expandAccessories, setExpandAccessories] = useState(false);

  //Toggle menue
  const toggle = () => {
    setMenu(!menu);
    setShowLinks(!showLinks);
    setMenShopLinks(false);
    setWomenShopLinks(false);
    setKidsShopLinks(false);
    setAccessoriesShopLinks(false);
    setExpand(false);
    setExpandWomen(false);
    setExpandKids(false);
    setExpandAccessories(false);
  };

  const testclose = () => {
    testgg();
    setTimeout(() => {
      toggle();
    }, 1000);
  };

  //Toggle Links
  const showMenLinks = () => {
    setMenShopLinks(!menShopLinks);
    setExpand(!expand);
  };

  const showWomenLinks = () => {
    setWomenShopLinks(!womenShopLinks);
    setExpandWomen(!expandWomen);
  };

  const showKidsLinks = () => {
    setKidsShopLinks(!kidsShopLinks);
    setExpandKids(!expandKids);
  };

  const showAccessoriesLinks = () => {
    setAccessoriesShopLinks(!accessoriesShopLinks);
    setExpandAccessories(!expandAccessories);
  };

  const style = {
    textDecoration: "none",
    color: "black",
    pading: "0rem",
    margin: "0rem",
  };
  return (
    <Fragment>
      <div className="nav-wrapper">
        <nav className="navs">
          <Link to="/" style={style}>
            <h4 className="shop-name">Elcassica</h4>
          </Link>
          <ul className="desktop">
            <Link to="/men-shop" style={style}>
              <li>Men</li>
            </Link>
            <Link to="/women-shop" style={style}>
              <li>Women</li>
            </Link>
            <Link to="/kids-shop" style={style}>
              <li>Kids</li>
            </Link>
            <Link to="/accessories-shop" style={style}>
              <li>Accesessories</li>
            </Link>
            <Link to="/men-shop/shoes" style={style}>
              <li>Foot-ware</li>
            </Link>
            <Link className="sale" to="/women-shop" style={style}>
              <li>Sale</li>
            </Link>
            <Link to="/" style={style}>
              <li>Home</li>
            </Link>
          </ul>
          {showLinks ? (
            <ul className="mobile">
              <div className="mobile-links">
                <div className="men-link">
                  <li onClick={() => showMenLinks()}>
                    Men{" "}
                    {expand ? (
                      <span>
                        <ExpandMoreIcon className="expand-more-icon" />
                      </span>
                    ) : (
                      <span>
                        <ArrowForwardIosIcon className="expand-icon" />
                      </span>
                    )}
                  </li>
                  {menShopLinks ? (
                    <Fragment>
                      <Link to="/men-shop/jeans" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="mobile-shop-link"
                        >
                          Jeans
                        </li>
                      </Link>
                      <Link to="/men-shop" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="mobile-shop-link"
                        >
                          Suits
                        </li>
                      </Link>
                      <Link to="/men-shop/shirts" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="mobile-shop-link"
                        >
                          T-Shirts
                        </li>
                      </Link>
                      <Link to="/men-shop/caps" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="mobile-shop-link"
                        >
                          Caps
                        </li>
                      </Link>
                      <Link to="/men-shop/shoes" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="mobile-shop-link"
                        >
                          Shoes
                        </li>
                      </Link>
                    </Fragment>
                  ) : null}
                </div>
                <div className="women-link">
                  <li onClick={() => showWomenLinks()}>
                    Women{" "}
                    {expandWomen ? (
                      <span>
                        <ExpandMoreIcon className="expand-more-icon" />
                      </span>
                    ) : (
                      <span>
                        <ArrowForwardIosIcon className="expand-icon" />
                      </span>
                    )}
                  </li>
                  {womenShopLinks ? (
                    <Fragment>
                      <Link to="/women-shop/jumpsuits" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="women-mobile-link"
                        >
                          Jumpsuits
                        </li>
                      </Link>
                      <Link to="/women-shop" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="women-mobile-link"
                        >
                          Dresses
                        </li>
                      </Link>
                      <Link to="/women-shop/skirts" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="women-mobile-link"
                        >
                          Skirts & Shorts
                        </li>
                      </Link>
                      <Link to="/women-shop/jeans" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="women-mobile-link"
                        >
                          Jeans
                        </li>
                      </Link>
                      <Link to="/women-shop/shoes" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="women-mobile-link"
                        >
                          Shoes
                        </li>
                      </Link>
                    </Fragment>
                  ) : null}
                </div>
                <div className="kids-link">
                  <li onClick={() => showKidsLinks()}>
                    Kids{" "}
                    {expandKids ? (
                      <span>
                        <ExpandMoreIcon className="expand-more-icon" />
                      </span>
                    ) : (
                      <span>
                        <ArrowForwardIosIcon className="expand-icon" />
                      </span>
                    )}
                  </li>
                  {kidsShopLinks ? (
                    <Fragment>
                      <Link to="/kids-shop" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="kids-mobile-link"
                        >
                          Girls
                        </li>
                      </Link>
                      <Link to="/kids-shop/boys" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="kids-mobile-link"
                        >
                          Boys
                        </li>
                      </Link>
                    </Fragment>
                  ) : null}
                </div>
                <div className="accessories-link">
                  <li onClick={() => showAccessoriesLinks()}>
                    Accessories{" "}
                    {expandAccessories ? (
                      <span>
                        <ExpandMoreIcon className="expand-more-icon" />
                      </span>
                    ) : (
                      <span>
                        <ArrowForwardIosIcon className="expand-icon" />
                      </span>
                    )}
                  </li>
                  {accessoriesShopLinks ? (
                    <Fragment>
                      <Link to="/accessories-shop/men" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="accessories-mobile-link"
                        >
                          Men
                        </li>
                      </Link>
                      <Link to="/accessories-shop" style={style}>
                        <li
                          onClick={() => toggle()}
                          className="accessories-mobile-link"
                        >
                          Women
                        </li>
                      </Link>
                    </Fragment>
                  ) : null}
                </div>
                <Link className="sale" to="/women-shop" style={style}>
                  <li>Sale</li>
                </Link>
                <Link to="/" style={style}>
                  <li>Home</li>
                </Link>
                <Link to="/dashboard" style={style}>
                  <li>Account</li>
                </Link>
              </div>
            </ul>
          ) : null}
          <div className="icons">
            <AiOutlineSearch className="icon search" />
            <Link to="/dashboard" style={style}>
              <VscAccount className="icon account" />
            </Link>
            <AiOutlineHeart className="icon wishlist" />
            <Link to="/cart" style={style}>
              <div className="cart">
                <AiOutlineShoppingCart className="icon cart" />
                {cartItems.length > 0 && <div>{cartItems.length}</div>}
              </div>
            </Link>
            {menu && window.innerWidth <= 500 ? (
              <MenuOpenOutlinedIcon
                onClick={() => toggle()}
                style={{ color: "black" }}
              />
            ) : (
              <span
                className="hamburger"
                style={{ zIndex: "10000", position: "relative", color: "#fff" }}
              >
                <CloseOutlinedIcon
                  onClick={() => testclose()}
                  style={{ size: "1.2rem" }}
                />
              </span>
            )}
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Navigation;
