import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <nav className='navbar navbar-dark navbar-expand-lg bg-dark'>
      <div className='container'>
        <Link to='/' className='navbar-brand styledFont text-success'>
          Grammar Quiz
        </Link>
        {isLoggedIn ? <LoggedIn /> : <LoggedOut />}
      </div>
    </nav>
  );
};

export default Navbar;
