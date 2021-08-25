import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TRY_ACTIONS } from "../../redux/action";

const LoggedIn = () => {
  const { username } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className='dropdown'>
      <button
        className='bg-transparent border-0'
        data-bs-toggle='dropdown'
        data-bs-auto-close='true'
        aria-expanded='false'
        style={{ outline: "none" }}>
        <i className='bi bi-person-fill text-light fs-3' />
      </button>
      <ul className='dropdown-menu dropdown-menu-end bg-black'>
        <li>
          <span className='dropdown-header styledFont fw-bolder fs-5'>
            {username}
          </span>
        </li>
        <li>
          <Link
            className='dropdown-item text-light'
            to='/login'
            onClick={(e) => dispatch(TRY_ACTIONS.LOGOUT())}>
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LoggedIn;
