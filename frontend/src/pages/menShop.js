import React, { useContext, useEffect, Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation/Navigation";
import ProductsContext from "../context/products/productsContext";
import ShopStyles from "../components/Styles/ShopStyles";
import SideNavigation from "../components/SideNavigation/SideNavigation";
import Products from "../components/Store/Products/Products";
import CustomerSubscription from "../components/Store/CustomerSubscription/CustomerSubscription";
import { getProductsByCategory } from "../HOC/shop/shopActions";
import { MENSHOP } from "../HOC/constants/constants";

const MenShop = () => {
  const productsContext = useContext(ProductsContext);
  const { products, fetchProducts } = productsContext;

  console.log(products);

  const { shop, categories } = MENSHOP;

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <Navigation />
      <ShopStyles>
        <div className="shop">
          <SideNavigation />
          <Switch>
            <Route exact path="/men-shop">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.suits)
                    : null
                }
                header="Men Suits & Jackets"
              />
            </Route>
            <Route exact path="/men-shop/shirts">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(
                        products,
                        shop,
                        categories.tShirts.split("-")[1]
                      )
                    : null
                }
                header="Men Shirts"
              />
            </Route>
            <Route exact path="/men-shop/jeans">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.jeans)
                    : null
                }
                header="Men Jeans"
              />
            </Route>
            <Route exact path="/men-shop/caps">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.caps)
                    : null
                }
                header="Men Caps"
              />
            </Route>
            <Route exact path="/men-shop/shoes">
              <Products
                productCategory={
                  products.length > 0
                    ? getProductsByCategory(products, shop, categories.shoes)
                    : null
                }
                header="Men Shoes"
              />
            </Route>
            <Route exact path="/men-shop/accessories">
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

export default MenShop;
