import React from "react";
import Styled from "styled-components";

import Buttons from "../../Buttons/Buttons";

const Comments = () => {
  return (
    <CommentsStyles>
      <form>
        <div className="name">
          <label>Name :</label>
          <input type="text" name="name" />
        </div>
        <div className="title">
          <label>Title :</label>
          <input type="text" name="title" />
        </div>
        <div className="comment">
          <label>Comment :</label>
          <textarea type="text" name="comment" />
        </div>
        <CommentBtn onClick={(e) => e.preventDefault()}>Submit</CommentBtn>
      </form>
    </CommentsStyles>
  );
};

const CommentBtn = Styled(Buttons)`
    background: black;
    color: #fff;
    width: 100%;
    font-family: Montserrat-Medium;
    text-transform: capitalize;
    font-size: 1rem;
   
`;

const CommentsStyles = Styled.section`
    width: 50%;
    font-family: Montserrat-Medium;
    font-size: .9rem;
   

    form div{
        margin: 1rem 0rem;

        label{
            display: block;
            margin-bottom: 1rem;
        }

        input{
            width: 100%;
            height: 2rem;
            padding: .8rem;
            background: transparent;
            border: 1px #5a5a5a solid;
        }

        textarea{
            width: 100%;
            height: 10rem;
            background: transparent;
            padding: 1rem;
        }
    }
`;

export default Comments;
