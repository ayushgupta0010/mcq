import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Unverified = () => {
  const { isLoggedIn, isVerified } = useSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) history.push("/login");
    else if (isVerified === true) history.push("/");
    else document.title = "Account Unverified";
  }, [history, isLoggedIn, isVerified]);

  return (
    <div className='container'>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: "85vh" }}>
        <div className='text-center'>
          <p className='text-skyblue m-0 fs-3'>You will be shown this page</p>
          <p className='text-skyblue m-0 fs-3'>
            until you are verified by a trusted user
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unverified;
