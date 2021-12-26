import React from "react";
import styled from "styled-components";

const Tabs = ({ trackProgress, currentTab, changeTabHandler }) => {
  const updateTab = (tab, currentTabProgress) => {
    if (trackProgress[currentTabProgress]) {
      changeTabHandler(tab);
    }
  };
  return (
    <TabStyles>
      <ul>
        <li
          className={currentTab === "tab-1" ? "active-tab" : ""}
          onClick={() => updateTab("tab-1", "basicInfo")}
        >
          Add Basic Info
        </li>
        <li
          className={currentTab === "tab-2" ? "active-tab" : ""}
          onClick={() => updateTab("tab-2", "productImgs")}
        >
          Product Images
        </li>
        <li
          className={currentTab === "tab-3" ? "active-tab" : ""}
          onClick={() => updateTab("tab-3", "pricing")}
        >
          Pricing
        </li>
        <li
          className={currentTab === "tab-4" ? "active-tab" : ""}
          onClick={() => updateTab("tab-4", "inventory")}
        >
          Inventory
        </li>
        <li
          className={currentTab === "tab-5" ? "active-tab" : ""}
          onClick={() => updateTab("tab-5", "variations")}
        >
          Variations
        </li>
        <li
          className={currentTab === "tab-6" ? "active-tab" : ""}
          onClick={() => updateTab("tab-6", "shipping")}
        >
          Shipping
        </li>
      </ul>
    </TabStyles>
  );
};

const TabStyles = styled.div`
    margin-bottom: 2rem;

    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;

      li {
          list-style: none;
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
`;

export default Tabs;
