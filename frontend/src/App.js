import "./App.css";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import MainShop from "./pages/mainShop";
import MenShop from "./pages/menShop";
import WomenShop from "./pages/womenShop";
import KidsShop from "./pages/kidsShop";
import AccessoriesShop from "./pages/accessoriesShop";
import SingleProduct from "./pages/singleProduct";
import Cart from "./pages/cart";
import Shipping from "./pages/shipping";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/signIn";
import OrderSummary from "./pages/orderSummary";
import ThankYouPage from "./pages/thankYouPage";
import DashboardHome from "./pages/dashboard/dashboardHome";
import OrderOverview from "./pages/dashboard/orderOverview";
import Sales from "./pages/dashboard/sales";
import Products from "./pages/dashboard/products";
import Users from "./pages/dashboard/users";
import Product from "./pages/dashboard/product";
import CustomerOrder from "./pages/dashboard/customerOrder";
import CustomerDashboardHome from "./pages/dashboard/customerDashboardHome";
import SignUp from "./pages/SignUp";
import SignUpMessage from "./pages/signUpMessage";
import MailVerification from "./pages/mailVerification";
//
const App = () => {
  return (
    <div className="wrapper" style={{ position: "relative" }}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/main-shop/" component={MainShop} />
        <Route exact path="/men-shop/:path?" component={MenShop} />
        <Route exact path="/women-shop/:path?" component={WomenShop} />
        <Route exact path="/kids-shop/:path?" component={KidsShop} />
        <Route
          exact
          path="/accessories-shop/:path?"
          component={AccessoriesShop}
        />
        <Route exact path="/product/:id?" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/cart/shipping/" component={Shipping} />
        <Route exact path="/cart/orderSummary" component={OrderSummary} />
        <Route exact path="/order/success" component={ThankYouPage} />
        <Route exact path="/signUp/message" component={SignUpMessage} />
        <Route
          exact
          path="/signUp/mailVerification/:id"
          component={MailVerification}
        />
        <Route exact path="/dashboard" component={DashboardHome} />
        <Route
          exact
          path="/dashboard/orderOverview"
          component={OrderOverview}
        />
        <Route exact path="/dashboard/sales" component={Sales} />
        <Route exact path="/dashboard/products" component={Products} />
        <Route exact path="/dashboard/users" component={Users} />
        <Route exact path="/dashboard/product" component={Product} />
        <Route exact path="/dashboard/order/:id?" component={CustomerOrder} />
        <Route exact path="/myDashboard/" component={CustomerDashboardHome} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
