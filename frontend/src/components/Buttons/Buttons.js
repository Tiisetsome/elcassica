import styled from "styled-components";

const Buttons = styled.button`
  background-color: ${(props) =>
    props.secondary ? "red" : props.outline ? "#fff" : "#c9ba1e"};
  width: ${(props) => (props.resize ? "12rem" : "14rem")};
  /*height: 4rem;*/
  padding: ${(props) => (props.resize ? "0.8rem 0rem" : "1rem 0rem")};
  outline: none;
  border: ${(props) => (props.outline ? "0.15rem black solid" : "none")};
  font-size: ${(props) => (props.outline ? "1rem" : "1.3rem")};
  margin-right: 3rem;
  font-family: ${(props) =>
    props.secondary ? "BauerBodoniStd-Italic" : "BauerBodoniStd-Roman"};
  color: ${(props) => (props.outline ? "black" : "#fff")};
  text-transform: uppercase;
  cursor: pointer;
  z-index: 100;

  &:hover {
    background: black;
    color: #fff;
    border: ${(props) => (props.outline ? "0.15rem black solid" : " none")};
    transition: all 0.125s ease-in-out;
  }

  @media screen and (max-width: 1024px) {
    width: 9rem;
    font-size: 0.8rem;
    padding: 0.8rem 0rem;
  }

  @media screen and (max-width: 500px) {
    width: 7rem;
    font-size: 0.6rem;
    margin-right: 1.5rem;
    padding: 0.5rem 0rem;
    border: ${(props) => (props.outline ? "0.1rem black solid" : "none")};
  }

  @media screen and (max-width: 320px) {
    width: 6rem;
  }
`;

export default Buttons;
