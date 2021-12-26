import React, { useContext, useEffect, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import ProductsContext from "../context/products/productsContext";
import ShopStyles from "../components/Styles/ShopStyles";
import WomenSideNavigation from "../components/SideNavigation/WomenSideNavigation";
import Products from "../components/Store/Products/Products";
import CustomerSubscription from "../components/Store/CustomerSubscription/CustomerSubscription";
import { getProductsByCategory } from "../HOC/shop/shopActions";
import { WOMENSHOP } from "../HOC/constants/constants";

const WomenShop = () => {
  const productsContext = useContext(ProductsContext);
  const { products, fetchProducts } = productsContext;

  const { shop, categories } = WOMENSHOP;

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <ShopStyles>
        <div className="shop">
          <WomenSideNavigation />
          <Switch>
            <Route exact path="/women-shop">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.dresses)
                    : null
                }
                header="Women Dresses"
              />
            </Route>
            <Route exact path="/women-shop/jumpsuits">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(
                        products,
                        shop,
                        categories.jumpsuits
                      )
                    : null
                }
                header="Women Jumpsuits"
              />
            </Route>
            <Route exact path="/women-shop/jeans">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.jeans)
                    : null
                }
                header="Women Jeans"
              />
            </Route>
            <Route exact path="/women-shop/skirts">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.skirts)
                    : null
                }
                header="Women Skirts"
              />
            </Route>
            <Route exact path="/women-shop/shoes">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.shoes)
                    : null
                }
                header="Women Shoes"
              />
            </Route>
            <Route exact path="/women-shop/accessories">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(
                        products,
                        shop,
                        categories.accessories
                      )
                    : null
                }
                header="Women Accessories"
              />
            </Route>
          </Switch>
        </div>
      </ShopStyles>
      <CustomerSubscription />
    </Fragment>
  );
};

export default WomenShop;
