import React from "react";
import styled from "styled-components";
import { IoMdNotifications } from "react-icons/io";
import { ToWords } from "to-words";

const NotificationMessage = ({
  numberOfNotifications,
  disableNotificationHandler,
}) => {
  const numberToWord = new ToWords().convert(numberOfNotifications);
  return (
    <NotificationMessageStyles className="flex-2">
      <div className="icon-wrapper flex-3">
        <IoMdNotifications style={{ fontSize: "1.8rem", color: "#009d54" }} />
        <div className="notification-number flex-3">
          {numberOfNotifications}
        </div>
      </div>
      <p>
        You have {numberToWord.toLowerCase()} new{" "}
        {numberOfNotifications > 1 ? "notifications" : "notification"}.
      </p>
      <div className="cancel-icon" onClick={() => disableNotificationHandler()}>
        <div></div>
        <div></div>
      </div>
    </NotificationMessageStyles>
  );
};

const NotificationMessageStyles = styled.div`
  gap: 2rem;
  padding: 0.8rem 1rem;
  margin-bottom: 3rem;
  background-color: #fff;
  color: var(--grey-color);
  position: relative;
  border-bottom: 1px #aaaaaa solid;

  p {
    font-family: Montserrat-Medium !important;
  }

  .icon-wrapper {
    width: 3rem;
    height: 3rem;
    border-radius: 100rem;
    background-color: var(--body-color);
    position: relative;

    .notification-number {
      right: -10px;
      top: 0;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 100rem;
      background: var(--green-color);
      border: 3px #fff solid;
      position: absolute;
      color: #fff;
      font-size: 0.7rem;
    }
  }

  .cancel-icon {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;

    div {
      width: 1.6rem;
      height: 1px;
      transform: rotate(45deg);
      background-color: var(--grey-color);
    }

    div:last-child {
      transform: rotate(-45deg);
    }
  }
`;

export default NotificationMessage;
