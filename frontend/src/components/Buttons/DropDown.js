import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

const DropDown = ({ changeYearDisplayHandler }) => {
  const [currentYear, setCurrentYear] = useState();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showDropDownMenu, setShowDropDownMenu] = useState(false);

  const changeYearHandler = (year) => {
    setSelectedYear(year);
    changeYearDisplayHandler(year);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setCurrentYear(currentYear);
  }, []);
  return (
    <DropDownStyles
      className="dropdown-btn flex-3"
      onClick={() => setShowDropDownMenu(!showDropDownMenu)}
    >
      <span>{selectedYear}</span>
      <IoMdArrowDropdown style={{ fontSize: "1.5rem", color: "#5a5a5a" }} />
      {showDropDownMenu && (
        <ul className="years">
          <li onClick={() => changeYearHandler(currentYear)}>{currentYear}</li>
          <li onClick={() => changeYearHandler(currentYear - 1)}>
            {currentYear - 1}
          </li>
          <li onClick={() => changeYearHandler(currentYear - 2)}>
            {currentYear - 2}
          </li>
        </ul>
      )}
    </DropDownStyles>
  );
};

const DropDownStyles = styled.div`
  position: relative;
  .dropdown-btn {
    gap: 1rem;
    padding: 0.15rem 1.5rem;
    border-radius: 2px;
    background-color: var(--body-color);
    font-family: Montserrat-Regular;
  }

  ul {
    top: 2.8rem;
    left: -2rem;
    width: 8rem;
    padding: 1rem;
    position: absolute;
    list-style: none;
    font-size: 0.7rem;
    background: #fff;
    box-shadow: 0px 0px 25px rgba(112, 112, 112, 0.18);
    z-index: 1000000;
    cursor: pointer;

    li {
      color: var(--grey-color);
      padding-bottom: 0.25rem;
      margin-bottom: 0.5rem;
      border-bottom: 1px #f8f8f8 solid;
    }
  }
`;

export default DropDown;
