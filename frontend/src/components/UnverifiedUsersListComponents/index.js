import React, { useEffect, useState } from "react";
import { USER } from "../../utils/urls";
import axiosIntercepted from "../../utils/axiosIntercepted";

const UnverifiedUsersList = () => {
  const [usersList, setUsersList] = useState([]);

  const removeUser = (username) =>
    setUsersList((original) => original.filter((x) => x !== username));

  const handleVerify = (e, username) =>
    axiosIntercepted
      .get(USER.VERIFY_URL, { urlParams: { username } })
      .then((response) => removeUser(username))
      .catch((error) => error);

  const handleUnverify = (e, username) =>
    axiosIntercepted
      .delete(USER.DELETE_URL, { urlParams: { username } })
      .then((response) => removeUser(username))
      .catch((error) => error);

  useEffect(() => {
    document.title = "Unverified Users";
    axiosIntercepted
      .get(USER.LIST_UNVERIFIED)
      .then((response) => setUsersList(response.data))
      .catch((error) => error);
  }, []);

  return (
    <div className='container my-3'>
      <ul className='list-group'>
        {usersList.map((user, i) => (
          <li
            className='list-group-item d-flex justify-content-between align-items-center bg-black'
            key={i}>
            <span className='text-light'>{user}</span>
            <div className='d-flex'>
              <button
                className='btn btn-success me-2'
                onClick={(e) => handleVerify(e, user)}>
                <i className='bi bi-person-check-fill' />
              </button>
              <button
                className='btn btn-danger'
                onClick={(e) => handleUnverify(e, user)}>
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

export default UnverifiedUsersList;
