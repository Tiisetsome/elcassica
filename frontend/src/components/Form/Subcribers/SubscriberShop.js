import React from "react";
import styled from "styled-components";

const SubscriberShop = () => {
  return (
    <FormStyle>
      <form>
        <input name="email" type="text" placeholder="Enter Email" />
        <button>Ok</button>
      </form>
    </FormStyle>
  );
};

const FormStyle = styled.div`
  form {
    display: flex;

    input {
      height: 2.5rem;
      font-size: .8rem;
      padding: 1rem;
      width: 100%;
  }

  button{
      width: 5rem;
      color: #fff;
      border: none;
      background-color: black;
      cursor: pointer;
  }

  @media screen and (max-width: 768px){
  
    input{
      height: 2rem !important;
      font-size: .7rem;
      padding: .8rem;
    }
    
    button{
      font-size: .7rem;
    }
  }

  @media screen and (max-width: 500px){
    input{
      height: 1.8rem !important;
      font-size: .7rem;
      padding: .5rem;
    }
    
    button{
      font-size: .7rem;
    }
  }
`;

export default SubscriberShop;
