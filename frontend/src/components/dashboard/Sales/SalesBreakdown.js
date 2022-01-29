import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import OrderContext from "../../../context/orders/orderContext";
import { MENSHOP, WOMENSHOP, KIDSHOP } from "../../../HOC/constants/constants";
import Container from "../../../containers/Container";
import DropDown from "../../Buttons/DropDown";

const SalesBreakdown = () => {
  const orderContext = useContext(OrderContext);
  const { dashOrders } = orderContext;

  const [currentShop, setCurrentShop] = useState(MENSHOP.shop);
  const [currentTab, setCurrentTab] = useState("all");
  const [salesItems, setSalesItems] = useState([]);
  const [filteredSalesItems, setFilteredSalesItems] = useState([]);
  const [ordersCurrentYearDisplay, setOrdersCurrentYearDisplay] = useState(
    new Date().getFullYear()
  );

  const getALLOrderedItems = (currentYearDisplay) => {
    const allOrderedItems = [];
    dashOrders.forEach((order) => {
      const orderFullDate = new Date(order.createdAt);
      const yearOrderCreated = orderFullDate.getFullYear();
      if (yearOrderCreated === currentYearDisplay) {
        allOrderedItems.push(...order.orderItems);
      }
    });
    return allOrderedItems;
  };

  const getIdsOfAllOrderedItems = (orderedItems, shop) => {
    const idsOfAllOrderedItems = [];
    orderedItems.forEach((item) => {
      if (item.shop === shop) {
        idsOfAllOrderedItems.push(item.product._id);
      }
    });
    return idsOfAllOrderedItems;
  };

  const createObjectToGroupItemsById = (allIds) => {
    const orderedItems = {};
    allIds.forEach((id) => {
      orderedItems[id] = [];
    });
    return orderedItems;
  };

  const groupOrderItems = (itemsObj, shop) => {
    const groupedItems = itemsObj;
    dashOrders.forEach((customerOrder) => {
      const yearOrderCreated = new Date(customerOrder.createdAt).getFullYear();

      customerOrder.orderItems.forEach((order) => {
        if (
          order.shop === shop &&
          yearOrderCreated === ordersCurrentYearDisplay
        ) {
          groupedItems[order.product._id] = [];
          groupedItems[order.product._id] = [
            ...groupedItems[order.product._id],
            order,
          ];
        }
      });
    });
    return groupedItems;
  };

  const reduceGroupItemsToSingleValue = (items) => {
    const reducedItems = [];
    for (const currentItem in items) {
      if (items[currentItem].length > 1) {
        let singleItem = items[currentItem].reduce((acc, item) => {
          return {
            ...acc,
            quantity: acc.quantity + item.quantity,
          };
        });
        reducedItems.push(singleItem);
      } else {
        reducedItems.push(items[currentItem][0]);
      }
    }
    return reducedItems;
  };

  const removeItemDuplicateIds = (ids) => [...new Set(ids)];

  const prepareItemsToBeRendered = (shop, currentYearDisplay) => {
    const itemsOrdered = getALLOrderedItems(currentYearDisplay);
    const itemsId = getIdsOfAllOrderedItems(itemsOrdered, shop);

    if (itemsId.length > 0) {
      const filteredItemIds = removeItemDuplicateIds(itemsId);
      const createdItemsGroup = createObjectToGroupItemsById(filteredItemIds);
      const groupedItems = groupOrderItems(createdItemsGroup, shop);
      const itemsToRender = reduceGroupItemsToSingleValue(groupedItems);
      setSalesItems(itemsToRender);
      setFilteredSalesItems(itemsToRender);
    } else {
      setSalesItems([]);
      setFilteredSalesItems([]);
    }
    setCurrentShop(shop);
    setCurrentTab("all");
  };

  const filterSalesItemsByCategory = (itemCategory) => {
    setCurrentTab(itemCategory);
    if (itemCategory === "all") {
      setFilteredSalesItems(salesItems);
    } else {
      const categoryFirstLetter = itemCategory.charAt(0).toUpperCase();
      let categoryName =
        categoryFirstLetter + itemCategory.slice(1, itemCategory.length);

      if (itemCategory === "tShirts") {
        categoryName =
          categoryFirstLetter +
          "-" +
          categoryName.slice(1, categoryName.length);
      }
      const items = salesItems.filter((item) => item.category === categoryName);
      setFilteredSalesItems(items);
    }
  };

  const renderCategoriesTabs = (categories) => {
    const categoriesArr = Object.keys(categories);
    return categoriesArr.map((category) => {
      return (
        <li
          key={category}
          className={currentTab === category ? "active-tab" : ""}
          onClick={() => filterSalesItemsByCategory(category)}
        >
          {category}
        </li>
      );
    });
  };

  useEffect(() => {
    prepareItemsToBeRendered(MENSHOP.shop, ordersCurrentYearDisplay);
  }, [dashOrders, ordersCurrentYearDisplay]);

  return (
    <SalesBreakdownStyles>
      <Container
        label="Total Sales"
        InfoComponent={DropDown}
        componentExists={true}
        changeYearDisplayHandler={setOrdersCurrentYearDisplay}
      >
        <div className="sales-wrapper">
          <aside>
            <ul>
              <li
                onClick={() =>
                  prepareItemsToBeRendered(
                    MENSHOP.shop,
                    ordersCurrentYearDisplay
                  )
                }
                className={currentShop === MENSHOP.shop ? "active-link" : ""}
              >
                Men
              </li>
              <li
                onClick={() =>
                  prepareItemsToBeRendered(
                    WOMENSHOP.shop,
                    ordersCurrentYearDisplay
                  )
                }
                className={currentShop === WOMENSHOP.shop ? "active-link" : ""}
              >
                Women
              </li>
              <li
                onClick={() =>
                  prepareItemsToBeRendered(
                    KIDSHOP.shop,
                    ordersCurrentYearDisplay
                  )
                }
                className={currentShop === KIDSHOP.shop ? "active-link" : ""}
              >
                Kids
              </li>
            </ul>
          </aside>
          <section>
            <div className="tabs">
              <ul>
                <li
                  className={currentTab === "all" ? "active-tab" : ""}
                  onClick={() => filterSalesItemsByCategory("all")}
                >
                  All
                </li>
                {currentShop === MENSHOP.shop ? (
                  renderCategoriesTabs(MENSHOP.categories)
                ) : currentShop === WOMENSHOP.shop ? (
                  renderCategoriesTabs(WOMENSHOP.categories)
                ) : (
                  <li>All</li>
                )}
              </ul>
            </div>
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Item Price</th>
                  <th>Stock Price</th>
                  <th>Total Sale</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalesItems.length > 0 &&
                  filteredSalesItems.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="flex-3">
                          <div className="img-container">
                            <img src={item.imageUrl} />
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>R {item.price}</td>
                        <td>R{item.product.stockPrice}</td>
                        <td>R {item.price * item.quantity}</td>
                        <td>
                          R{" "}
                          {(item.price - item.product.stockPrice) *
                            item.quantity}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
        </div>
      </Container>
    </SalesBreakdownStyles>
  );
};

const SalesBreakdownStyles = styled.section`
  margin-top: 3rem;

  ul li {
    list-style: none;
  }

  .sales-wrapper {
    display: grid;
    grid-template-columns: 10rem 1fr;

    aside {
      border-right: 1px #d6d6d6 solid;

      ul {
        padding: 3rem 1rem;

        li {
          margin-bottom: 1rem;
          cursor: pointer;
        }

        li:hover{
          font-family: Montserrat-Semibold;
        }

        .active-link{
          font-family: Montserrat-Semibold;

        }
      }
    }

    section {
      width: 100%;

      .tabs{
        margin-bottom: 2rem;

        ul {
          width: 100%;
          display: flex;
          justify-content: space-between;
  
          li {
            width: 100%;
            padding: 0.5rem 0rem;
            text-align: center;
            background-color var(--light-grey-extra);
            cursor: pointer;
          }
  
          .active-tab{
              background-color: var(--light-blue-color);
              color: var(--dark-color);
              font-family: Montserrat-Semibold;
              border-top: 2px #05496b solid;
          }
        }
      }

      table{
        width: calc(100% - 4rem);
        margin: 0rem auto 2rem auto;
        border: 1px #d6d6d6 solid;
        font-size: .7rem;

        thead{
          tr{
            th{
              padding: .8rem 0rem;
            }
          }
        }

        tbody{
          tr{
            td{
              height: 5rem;
              padding: 0rem 0rem;
              text-align: center;
            }

            td:first-child{
              .img-container {
                width: 3.5rem;
                height: 3.5rem;
                overflow: hidden;
                border-radius: 50%;
                background-color: var(--light-grey);

                img{
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }
          }

          tr:nth-child(odd){
            td{
              background-color: var(--light-grey-extra);
            }
          }
        }
      }
    }
  }
`;

export default SalesBreakdown;
