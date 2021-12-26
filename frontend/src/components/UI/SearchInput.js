import React from "react";
import styled from "styled-components";
import { GoSearch } from "react-icons/go";

const SearchInput = ({ inputHandler }) => {
  return (
    <SearchInputStyles>
      <div className="input-wrapper flex-3">
        <input type="text" placeholder="search..." onChange={inputHandler} />
        <div className="icon flex-3">
          <GoSearch
            style={{
              fontSize: "1rem",
              color: "#fff",
            }}
          />
        </div>
      </div>
    </SearchInputStyles>
  );
};

const SearchInputStyles = styled.form`
  .input-wrapper {
    input {
      background-color: #f0f0f0;
      padding: 0.45rem 1rem;
      width: 10rem;
      border: none;
      outline: none;
      border-radius: 10rem;
      position: relative;
      font-size: 0.7rem;
      font-family: Montserrat-Regular;
    }

    .icon {
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 1.75rem;
      border-radius: 0rem 10rem 10rem 0rem;
      background: #009d54;
      position: absolute;
      cursor: pointer;
    }
  }
`;

export default SearchInput;
