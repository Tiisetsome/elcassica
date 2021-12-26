import React, { useContext, useEffect, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import ProductsContext from "../context/products/productsContext";
import ShopStyles from "../components/Styles/ShopStyles";
import KidsSideNavigation from "../components/SideNavigation/KidsSideNavigation";
import Products from "../components/Store/Products/Products";
import CustomerSubscription from "../components/Store/CustomerSubscription/CustomerSubscription";
import { getProductsByCategory } from "../HOC/shop/shopActions";
import { KIDSHOP } from "../HOC/constants/constants";

const MenShop = () => {
  const productsContext = useContext(ProductsContext);
  const { products, fetchProducts } = productsContext;

  const { boysShop, girlsShop, category } = KIDSHOP;

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <ShopStyles>
        <div className="shop">
          <KidsSideNavigation />
          <Switch>
            <Route exact path="/kids-shop">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, boysShop, category)
                    : null
                }
                header="Welcome to boys store"
              />
            </Route>
            <Route exact path="/kids-shop/girls">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, girlsShop, category)
                    : null
                }
                header="welcome girs store"
              />
            </Route>
          </Switch>
        </div>
      </ShopStyles>
      <CustomerSubscription />
    </Fragment>
  );
};

export default MenShop;
