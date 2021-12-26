import { Link } from "react-router-dom";

import NotificationContainer from "../../../../containers/NotificationContainer";
import { formatDateToString } from "../../../../HOC/shop/shopActions";
const ProductsNotifications = ({ products }) => {
  return (
    <NotificationContainer
      header="Some items need attention"
      date={formatDateToString(new Date())}
    >
      <div className="notification-icon flex-3">
        <div style={{ backgroundColor: "var(--pink-color" }}></div>
      </div>
      <div
        className="notification-line"
        style={{ backgroundColor: "var(--pink-color" }}
      ></div>
      <div className="message">
        <p>The following products/items are running out of stock :</p>
        <ul>
          {products.map((product) => {
            return (
              <Link
                to={{
                  pathname: "/dashboard/product/",
                  state: {
                    productId: product,
                  },
                }}
                style={{ color: "var(--red-color)" }}
              >
                <li
                  key={product._id}
                  style={{ color: "var(--red-color)", margin: ".5rem 1.5rem" }}
                >
                  {product._id}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </NotificationContainer>
  );
};

export default ProductsNotifications;
