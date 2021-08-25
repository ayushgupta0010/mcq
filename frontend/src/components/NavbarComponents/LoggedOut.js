import React from "react";
import { Link } from "react-router-dom";

const LoggedOut = () => (
  <div className='d-flex'>
    <Link className='nav-link' to='/login'>
      Login
    </Link>
    <Link className='nav-link' to='/signup'>
      Signup
    </Link>
  </div>
);

export default LoggedOut;
