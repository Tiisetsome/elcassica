import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import ProductsContext from "../context/products/productsContext";
import ShopStyles from "../components/Styles/ShopStyles";
import AccessoriesSideNavigation from "../components/SideNavigation/AccessoriesSideNavigation";
import Products from "../components/Store/Products/Products";
import CustomerSubscription from "../components/Store/CustomerSubscription/CustomerSubscription";
import { getProductsByCategory } from "../HOC/shop/shopActions";
import Navigation from "../components/Navigation/Navigation";

const MenShop = () => {
  const productsContext = useContext(ProductsContext);
  const { products, fetchProducts } = productsContext;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <Navigation />
      <ShopStyles>
        <div className="shop">
          <AccessoriesSideNavigation />
          <Switch>
            <Route exact path="/accessories-shop/">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(
                        products,
                        "menProducts",
                        "Accessories"
                      )
                    : null
                }
                header="Men Accessories"
              />
            </Route>
            <Route exact path="/accessories-shop/women">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(
                        products,
                        "womenProducts",
                        "Accessories"
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
    </React.Fragment>
  );
};

export default MenShop;
