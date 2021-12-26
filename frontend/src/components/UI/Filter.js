import React from "react";
import styled from "styled-components";
import { RiCheckLine } from "react-icons/ri";

const Filter = ({
  optionOne,
  optionTwo,
  optionThree,
  filterHandler,
  filterOptions,
  activeLink,
  renderStyles,
}) => {
  return (
    <FilterStyles
      className="filter flex-2"
      style={renderStyles && { margin: "1rem 0rem", padding: "0rem" }}
    >
      <p>Filter :</p>
      <div className="check-marks flex-2">
        <div className="check-mark flex-2">
          <div
            className={`icon flex-3 ${
              activeLink === filterOptions[0] && "active"
            }`}
          >
            <RiCheckLine
              style={{ fontSize: "1rem", color: "#fff" }}
              onClick={() => filterHandler(filterOptions[0], 0)}
            />
          </div>
          <span>{optionOne}</span>
        </div>
        <div className="check-mark flex-2">
          <div
            className={`icon flex-3 ${
              activeLink === filterOptions[1] && "active"
            }`}
          >
            <RiCheckLine
              style={{ fontSize: "1rem" }}
              onClick={() => filterHandler(filterOptions[1], 1)}
            />
          </div>
          <span>{optionTwo}</span>
        </div>
        <div className="check-mark flex-2">
          <div
            className={`icon flex-3 ${
              activeLink === filterOptions[2] && "active"
            }`}
          >
            <RiCheckLine
              style={{ fontSize: "1rem" }}
              onClick={() => filterHandler(filterOptions[2], 2)}
            />
          </div>
          <span>{optionThree}</span>
        </div>
      </div>
    </FilterStyles>
  );
};

const FilterStyles = styled.div`
  margin: 2rem 0rem 1rem 0rem;
  padding: 0rem 1rem;
  gap: 1rem;

  p {
    font-family: Montserrat-Semibold;
    color: var(--dark-color);
  }

  .check-marks {
    gap: 1.5rem;
    backgound: red;

    .check-mark {
      gap: 1rem;

      .icon {
        width: 1rem;
        height: 1rem;
        border-radius: 2px;
        border: 1px #d6d6d6 solid;
        color: #fff;
      }

      .active {
        background-color: var(--green-color);
        border: none;
      }

      span {
        font-size: 0.75rem;
      }
    }
  }
`;

export default Filter;
