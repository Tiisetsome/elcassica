import React from "react";
import styled from "styled-components";

const NotificationContainer = ({ header, date, children, style }) => {
  return (
    <NotificationContainerStyles style={style && { ...style }}>
      <div className="notification-header flex-2">
        <p>{header}</p>
        <span>{date && date}</span>
      </div>
      {children}
    </NotificationContainerStyles>
  );
};

const NotificationContainerStyles = styled.div`
  background: #fff;
  border-bottom: 1px #aaaaaa solid;
  margin-bottom: 2rem;
  margin-left: 3rem;
  position: relative;

  &:last-child {
    margin-bottom: 0rem;

    .notification-line {
      display: none;
    }
  }

  .notification-header {
    justify-content: space-between;
    padding: 0.8rem;
    border-bottom: 1px #e3e3e3 solid;

    p {
      font-family: Montserrat-Medium;
      font-size: 0.75rem;
    }

    span {
      font-size: 0.7rem;
    }
  }
`;

export default NotificationContainer;
