import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import styled from "styled-components";

const FilterDropDown = ({ label }) => {
  return (
    <FilterDropDownStyles>
      <div className="flex-3 dropdown">
        <span>{label}</span>
        <IoMdArrowDropdown style={{ fontSize: "1.5rem", color: "#5a5a5a" }} />
      </div>
    </FilterDropDownStyles>
  );
};

const FilterDropDownStyles = styled.div`
  width: 12rem;

  .dropdown {
    gap: 1rem;
    padding: 0.15rem 1rem;
    border-radius: 2px;
    background-color: var(--light-grey-extra);
    font-family: Montserrat-Regular;
  }
`;

export default FilterDropDown;
