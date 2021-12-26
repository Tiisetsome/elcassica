import React from "react";
import styled from "styled-components";

const Container = ({
  label,
  InfoComponent,
  componentExists,
  inputHandler,
  children,
  showNotification,
  style,
  padding,
  numberOfNotifications,
  changeYearDisplayHandler,
  yearDisplayToChange,
}) => {
  return (
    <ContainerStyles style={{ ...style }}>
      <div className="headers flex-2">
        <div className="heading" style={{ ...padding }}>
          <h5>{label}</h5>
          {showNotification && numberOfNotifications > 0 && (
            <div className="notification-number flex-3">
              {numberOfNotifications}
            </div>
          )}
        </div>
        {componentExists && (
          <InfoComponent
            inputHandler={
              typeof inputHandler === "function" ? inputHandler : null
            }
            changeYearDisplayHandler={
              typeof changeYearDisplayHandler === "function"
                ? changeYearDisplayHandler
                : null
            }
          />
        )}
      </div>
      <div className="line-divider"></div>
      {children}
    </ContainerStyles>
  );
};

const ContainerStyles = styled.section`
  width: 100%;
  background-color: #fff;
  position: relative;
  border-bottom: 1px #aaaaaa solid;

  .headers {
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px #e3e3e3 solid;

    .heading {
      position: relative;

      h5 {
        color: var(--dark-color);
        font-family: Montserrat-Medium;
        font-weight: 600;
        font-size: 0.8rem;
      }

      .notification-number {
        right: -1.5rem;
        top: -0.5rem;
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

    .dropdown-btn {
      gap: 1rem;
      padding: 0.15rem 1.5rem;
      border-radius: 2px;
      background-color: var(--body-color);
      font-family: Montserrat-Regular;
    }
  }
`;

export default Container;
