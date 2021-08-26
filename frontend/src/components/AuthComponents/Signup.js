import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER } from "../../utils/urls";
import axios from "axios";

const Signup = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(USER.SIGNUP_URL, { ...user, is_verified: user.role === "student" })
      .then((response) => history.push("/login"))
      .catch((error) => setMessage("Username already exists"));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    } else {
      document.title = "Sign Up";
    }
  }, [history, isLoggedIn]);

  return (
    <div className='container'>
      {message && (
        <div className='alert alert-danger' role='alert'>
          {message}
        </div>
      )}
      <div className='d-flex flex-column my-5'>
        <form onSubmit={handleSubmit}>
          <div className='form-floating mb-3 border-dark w-50'>
            <input
              type='text'
              className='form-control'
              id='floatingInput'
              placeholder='Username'
              name='username'
              value={user.username}
              onChange={handleChange}
              required
            />
            <label htmlFor='floatingInput'>Username</label>
          </div>
          <div className='form-floating mb-3 border-dark w-50'>
            <input
              type='password'
              className='form-control'
              id='floatingPassword'
              placeholder='Password'
              name='password'
              value={user.password}
              onChange={handleChange}
              autoComplete='on'
              required
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <div className='form-floating mb-3 border-dark w-50'>
            <select
              className='form-select'
              id='floatingRole'
              name='role'
              value={user.role}
              onChange={handleChange}
              required>
              <option value='' hidden disabled>
                I am a
              </option>
              <option value='student'>Student</option>
              <option value='teacher'>Teacher</option>
            </select>
            <label htmlFor='floatingRole'>Account type</label>
          </div>
          <button className='btn btn-success'>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
