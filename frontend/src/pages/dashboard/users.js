import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import UserContext from "../../context/users/userContext";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import Container from "../../containers/Container";
import SearchInput from "../../components/UI/SearchInput";
import FilterDropDown from "../../components/UI/FilterDropDown";
import { clientValidation } from "../../HOC/validations/validationActions";

const Users = () => {
  window.scrollTo(0, 0);
  const userContext = useContext(UserContext);
  const { userLogin, users, fetchUsers, logOutUser } = userContext;

  const history = useHistory();

  clientValidation(history, userLogin, logOutUser);

  const formatNumbers = (number) => {
    const stringNum = number.toString();
    if (stringNum.length > 1 && stringNum[0] > "0") {
      return number;
    }
    return `0${stringNum}`;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);

    return `${formatNumbers(newDate.getMonth())}/${formatNumbers(
      newDate.getDate()
    )}/${newDate.getFullYear()}`;
  };

  useEffect(() => {
    if (userLogin !== null) {
      fetchUsers(userLogin.token);
    }
  }, [userLogin]);

  return (
    <UserStyles>
      <DashboardNavigation />
      <div className="dashboard-container">
        <Container
          label="Customers/Users"
          InfoComponent={SearchInput}
          componentExists={true}
        >
          <div className="filter-options-wrapper flex-2">
            <FilterDropDown label="Filter by province" />
            <FilterDropDown label="Filter by orders" />
            <FilterDropDown label="Filter by name" />
          </div>
          <div className="users-wrapper">
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Last Visited</th>
                  <th>Province</th>
                  <th>Orders History</th>
                  <th>Last Order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td className="flex-3">
                          <div className="img-container flex-3">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td>{`${user.name} ${user.lastName}`}</td>
                        <td>{user.email}</td>
                        <td>{formatDate(user.updatedAt)}</td>
                        <td>Gauteng</td>
                        <td>17</td>
                        <td>03/24/2021</td>
                        <td>Active</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </Container>
      </div>
    </UserStyles>
  );
};

const UserStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;

    .filter-options-wrapper {
      gap: 1rem;
      margin: 2rem 1rem;
    }

    .users-wrapper {
      table {
        width: calc(100% - 2rem);
        margin: 0rem auto 2rem auto;
        border: 1px #f8f8f8 solid;
        font-size: 0.7rem;

        thead {
          tr {
            th {
              padding: 1rem 1rem;
              text-align: left;
              font-size: 0.72rem;
              color: var(--dark-color);
            }
          }
        }

        tbody {
          tr {
            td {
              height: 5rem;
              padding: 1rem 1rem;
              text-align: left;
            }

            td:first-child {
              .img-container {
                width: 3rem;
                height: 3rem;
                overflow: hidden;
                border-radius: 50%;
                background-color: var(--blue-color);
                color: #fff;
                font-size: 0.85rem;
                font-family: Montserrat-Semibold;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }
              }
            }

            td:nth-child(6) {
              text-align: center;
            }

            .table-icons {
              gap: 0.5rem;
            }
          }

          tr:nth-child(odd) {
            td {
              background-color: var(--light-grey-extra);
            }
          }
        }
      }
    }
  }
`;

export default Users;
