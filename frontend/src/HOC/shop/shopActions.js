export const getProductsByCategory = (products, shop, category) => {
  const specificProductsCategory = [...products].filter(
    (product) => product.shop === shop && product.cartegory === category
  );
  return specificProductsCategory;
};

export const formatDateToString = (unformatedDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(unformatedDate);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
