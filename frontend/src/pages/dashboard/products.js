import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { BiError } from "react-icons/bi";

import UserContext from "../../context/users/userContext";
import ProductsContext from "../../context/products/productsContext";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import Filter from "../../components/UI/Filter";
import SearchInput from "../../components/UI/SearchInput";
import Container from "../../containers/Container";
import { MENSHOP, WOMENSHOP, KIDSHOP } from "../../HOC/constants/constants";
import { clientValidation } from "../../HOC/validations/validationActions";

const Products = () => {
  const userContext = useContext(UserContext);
  const productsContext = useContext(ProductsContext);

  const { userLogin, logOutUser } = userContext;
  const { products, fetchProducts, deleteProductFormDB } = productsContext;
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [activeLink, setActiveLink] = useState(MENSHOP.shop);
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfProductsPerPage, setNumberOfProductsPerPage] = useState(5);
  const [totalPagesToShow, setTotalPagesToShow] = useState(0);
  const [productDeleteId, setProductDeleteId] = useState(null);

  const history = useHistory();

  clientValidation(history, userLogin, logOutUser);

  const getFilteredProducts = (shop) => {
    const copiedProducts = JSON.parse(JSON.stringify(products));
    const filteredProducts = copiedProducts.filter(
      (product) => product.shop === shop
    );
    return filteredProducts;
  };

  const updateFilteredProductsAndCurrentPage = (
    products,
    currentPageNumber,
    operator
  ) => {
    const evaluation =
      operator === "+"
        ? currentPageNumber + 1
        : operator === "-"
        ? currentPageNumber - 1
        : 1;
    const indexOfLastProduct = evaluation * numberOfProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - numberOfProductsPerPage;
    const productsToShow = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setProductsToDisplay(productsToShow);
    setCurrentPage(evaluation);
  };

  const filterAndSetProductsToDisplay = (shop) => {
    const filteredProducts = getFilteredProducts(shop);
    const totalPagesToShow = Math.ceil(
      filteredProducts.length / numberOfProductsPerPage
    );

    updateFilteredProductsAndCurrentPage(filteredProducts, currentPage, null);
    setTotalPagesToShow(totalPagesToShow);
    setActiveLink(shop);
  };

  const paginationHandler = (shop, operator) => {
    const filteredProducts = getFilteredProducts(shop);
    const totalPagesToShow = Math.ceil(
      filteredProducts.length / numberOfProductsPerPage
    );

    if (currentPage + 1 <= totalPagesToShow && operator === "+") {
      updateFilteredProductsAndCurrentPage(
        filteredProducts,
        currentPage,
        operator
      );
    } else if (currentPage - 1 > 0 && operator === "-") {
      updateFilteredProductsAndCurrentPage(
        filteredProducts,
        currentPage,
        operator
      );
    }
  };

  const SearchFilterHandler = (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) => {
      if (product.brand.toLowerCase().includes(searchString, 0)) {
        return product;
      }
    });
    setProductsToDisplay(filteredProducts);
  };

  const convertArrToString = (wordsArray) => {
    let str = wordsArray[0];
    for (let i = 1; i < wordsArray.length; i++) {
      str += ", " + wordsArray[i];
    }
    return str;
  };

  const deleteProductHandler = (productId) => {
    deleteProductFormDB(userLogin.token, productId);
    setProductDeleteId(null);
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(MENSHOP.shop);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      filterAndSetProductsToDisplay(MENSHOP.shop);
    }
  }, [products]);

  const linkStyle = { textDecoration: "none", color: "black" };

  return (
    <ProductStyles>
      <DashboardNavigation />
      <div className="dashboard-container">
        <Container
          label="Products"
          InfoComponent={SearchInput}
          inputHandler={SearchFilterHandler}
          componentExists={true}
        >
          <Filter
            optionOne="Men"
            optionTwo="Women"
            optionThree="Kids"
            filterHandler={filterAndSetProductsToDisplay}
            filterOptions={[MENSHOP.shop, WOMENSHOP.shop, KIDSHOP.shop]}
            activeLink={activeLink}
          />
          <div className="products">
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Ratings</th>
                  <th>Colors</th>
                  <th>Shop</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsToDisplay.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td className="flex-3">
                        <div className="img-container">
                          <img src={product.imageUrl} />
                        </div>
                      </td>
                      <td>{product.brand}</td>
                      <td>R {product.price}</td>
                      <td>{product.quantity}</td>
                      <td>256</td>
                      <td>{convertArrToString(product.colors)}</td>
                      <td>Men</td>
                      <td>
                        <div className="table-icons flex-3">
                          <Link
                            to={{ pathname: `/product/${product._id}` }}
                            style={linkStyle}
                          >
                            <span>
                              <FaEye style={{ fontSize: ".65rem" }} />
                            </span>
                          </Link>
                          <Link
                            to={{
                              pathname: "/dashboard/product/",
                              state: {
                                productId: product,
                              },
                            }}
                            style={linkStyle}
                          >
                            <span>
                              <FaEdit style={{ fontSize: ".65rem" }} />
                            </span>
                          </Link>
                          <span onClick={() => setProductDeleteId(product._id)}>
                            <FaTrash style={{ fontSize: ".65rem" }} />
                          </span>
                          {productDeleteId === product._id && (
                            <div className="delete-notice">
                              <div
                                className="cancel-wrapper"
                                onClick={() => setProductDeleteId(null)}
                              >
                                <div className="cancel-icon">
                                  <div></div>
                                  <div></div>
                                </div>
                              </div>
                              <BiError
                                style={{ fontSize: "1.4rem", color: "#bf0059" }}
                              />
                              <p>
                                Deleting this item will also delete orders
                                associated with it. Are you sure?
                              </p>
                              <p
                                onClick={() =>
                                  deleteProductHandler(product._id)
                                }
                              >
                                continue
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bottom-options">
            <Link
              to={{
                pathname: "/dashboard/product",
                state: { fromProducts: true },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="download flex-2">
                <FaPlusCircle
                  style={{ fontSize: "1.2rem", color: "#05496b" }}
                />
                <span>Add New Item</span>
              </div>
            </Link>
            <div className="change-btns flex-2">
              <div className="check-mark flex-2">
                <span>Showing</span>
              </div>
              <div className="check-mark flex-2">
                <div
                  className="icon flex-3"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px #d6d6d6 solid",
                  }}
                >
                  <RiArrowDownSLine
                    style={{ fontSize: "1rem" }}
                    onClick={() => paginationHandler(activeLink, "-")}
                  />
                </div>
                <span>
                  {currentPage} of {totalPagesToShow}
                </span>
              </div>
              <div className="check-mark flex-2">
                <div
                  className="icon flex-3"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px #d6d6d6 solid",
                  }}
                >
                  <RiArrowUpSLine
                    style={{ fontSize: "1rem" }}
                    onClick={() => paginationHandler(activeLink, "+")}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </ProductStyles>
  );
};

const ProductStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;

    .products {
      table {
        width: calc(100% - 2rem);
        margin: 0rem auto 2rem auto;
        border: 1px #f8f8f8 solid;
        font-size: 0.7rem;

        thead {
          tr {
            th {
              padding: 0.8rem 0rem;
            }
          }
        }

        tbody {
          tr {
            td {
              height: 5rem;
              padding: 0rem 0rem;
              text-align: center;
            }

            td:first-child {
              .img-container {
                width: 3.5rem;
                height: 3.5rem;
                overflow: hidden;
                border-radius: 50%;
                background-color: var(--light-grey);

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }

            .table-icons {
              gap: 0rem;
              position: relative;

              span {
                padding: 0.2rem 0.65rem;
                border-radius: 0.3rem;
                background-color: var(--light-grey-extra);
                cursor: pointer;
              }

              span:hover {
                background-color: var(--light-grey);
                transition: all 0.2s;
              }

              .delete-notice {
                width: 18rem;
                top: 3rem;
                left: -12rem;
                padding: 0.8rem 1rem;
                border-radius: 5px;
                box-shadow: 0px 0px 25px rgba(112, 112, 112, 0.3);
                background-color: #fff;
                text-align: center;
                position: absolute;
                z-index: 100;

                .cancel-wrapper {
                  display: flex;
                  background: red;
                  position: relative;

                  .cancel-icon {
                    right: 0;
                    position: absolute;
                    cursor: pointer;

                    div {
                      width: 1rem;
                      height: 2px;
                      transform: rotate(45deg);
                      background-color: var(--grey-color);
                    }

                    div:last-child {
                      transform: rotate(-45deg);
                      margin-top: -2px;
                    }
                  }
                }

                p {
                  margin-top: 0.5rem;
                }

                p:last-child {
                  font-size: 0.75rem;
                  color: #bf0059;
                  cursor: pointer;
                }

                p:last-child:hover {
                  font-family: Montserrat-Semibold;
                }
              }
            }
          }

          tr:nth-child(even) {
            .table-icons {
              span {
                background-color: #fff;
              }
              span:hover {
                background-color: var(--light-grey);
              }
            }
          }

          tr:nth-child(odd) {
            td {
              background-color: var(--light-grey-extra);
            }
          }
        }
      }
    }

    .change-btns {
      gap: 1.5rem;

      .check-mark {
        gap: 1rem;

        .icon {
          width: 1rem;
          height: 1rem;
          border-radius: 2px;
        }

        .icon:hover {
          background-color: var(--green-color) !important;
          color: #fff !important;
          border-color: var(--green-color) !important;
          transition: all 0.2s;
        }

        span {
          font-size: 0.75rem;
        }
      }
    }

    .bottom-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0rem 1rem;
      margin-bottom: 2rem;
      width: calc(100% - 2rem);

      .change-btns {
        gap: 1rem;
      }

      .download {
        gap: 0.8rem;

        span {
          margin-top: 0.2rem;
          padding: 0.2rem 1rem;
          border-radius: 100rem;
          font-size: 0.7rem;
          font-family: Montserrat-Medium;
          color: var(--dark-color);
          background-color: var(--light-grey-extra);
        }

        span:hover {
          background-color: var(--light-grey);
          transition: all 0.2s;
        }
      }
    }
  }
`;

export default Products;
