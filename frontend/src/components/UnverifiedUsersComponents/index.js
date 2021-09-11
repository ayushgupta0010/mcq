import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { UNVERIFIED_USERS_LIST } from "../../utils/query";
import { VERIFY_USER, UNVERIFY_USER } from "../../utils/mutation";
import client from "../../utils/apollo";

const UnverifiedUsers = () => {
  const { isLoggedIn, role, isVerified } = useSelector((state) => state.auth);

  const [usersList, setUsersList] = useState([]);

  const history = useHistory();

  const removeUser = (username) =>
    setUsersList((original) =>
      original.filter((user) => user.username !== username)
    );

  const handleVerify = (username) =>
    client
      .mutate({ mutation: VERIFY_USER, variables: { username } })
      .then((response) => removeUser(username))
      .catch((error) => error);

  const handleUnverify = (username) =>
    client
      .mutate({ mutation: UNVERIFY_USER, variables: { username } })
      .then((response) => removeUser(username))
      .catch((error) => error);

  useEffect(() => {
    if (!isLoggedIn) history.push("/login");
    else if (isVerified === false) history.push("/account-unverified");
    else if (role && role !== "TEACHER") history.push("/forbidden");
    else {
      document.title = "Unverified Users";
      client
        .query({ query: UNVERIFIED_USERS_LIST })
        .then((response) => setUsersList(response.data.list))
        .catch((error) => error);
    }
  }, [history, isLoggedIn, isVerified, role]);

  return (
    <div className='container my-3'>
      <ul className='list-group'>
        {usersList.map((user, i) => (
          <li
            className='list-group-item d-flex justify-content-between align-items-center bg-black'
            key={i}>
            <span className='text-light'>{user.username}</span>
            <div className='d-flex'>
              <button
                className='btn btn-success me-2'
                onClick={() => handleVerify(user.username)}>
                <i className='bi bi-person-check-fill' />
              </button>
              <button
                className='btn btn-danger'
                onClick={() => handleUnverify(user.username)}>
                <i className='bi bi-person-x-fill' />
              </button>
            </div>
          </li>
        ))}
        {usersList.length === 0 && (
          <div className='text-center mt-5'>
            <span className='text-light fs-4'>No unverified users</span>
          </div>
        )}
      </ul>
    </div>
  );
};

export default UnverifiedUsers;
