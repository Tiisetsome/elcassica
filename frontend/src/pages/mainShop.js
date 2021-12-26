import React, { useContext, useEffect, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import ProductsContext from "../context/products/productsContext";
import ShopStyles from "../components/Styles/ShopStyles";
import AccessoriesSideNavigation from "../components/SideNavigation/AccessoriesSideNavigation";
import Products from "../components/Store/Products/Products";
import CustomerSubscription from "../components/Store/CustomerSubscription/CustomerSubscription";

const MainShop = () => {
  const productsContext = useContext(ProductsContext);
  const { products, fetchProducts } = productsContext;

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation/>
      <ShopStyles>
        <div className="shop">
          <AccessoriesSideNavigation />
          <Switch>
            <Route exact path="/main-shop/">
              <Products
                productCategory={products.length > 0 ? products : null}
                header="Men Accessories"
              />
            </Route>
          </Switch>
        </div>
      </ShopStyles>
      <CustomerSubscription />
    </Fragment>
  );
};

export default MainShop;
