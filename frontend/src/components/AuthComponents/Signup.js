import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER } from "../../utils/urls";
import axios from "axios";
import ClassList from "../UtilityComponents/ClassList";

const Signup = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
    cls: "",
  });
  const [message, setMessage] = useState("");

  const history = useHistory();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(USER.SIGNUP_URL, user)
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
              required
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <div className='form-floating mb-3 border-dark w-50'>
            <input
              type='text'
              className='form-control'
              id='floatingInput'
              placeholder='First Name'
              name='first_name'
              value={user.first_name}
              onChange={handleChange}
              required
            />
            <label htmlFor='floatingInput'>First Name</label>
          </div>
          <div className='form-floating mb-3 border-dark w-50'>
            <input
              type='text'
              className='form-control'
              id='floatingInput'
              placeholder='Last Name'
              name='last_name'
              value={user.last_name}
              onChange={handleChange}
              required
            />
            <label htmlFor='floatingInput'>Last Name</label>
          </div>
          <div className='form-floating mb-3 border-dark w-50'>
            <select
              className='form-select'
              id='floatingSelect'
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
            <label htmlFor='floatingSelect'>Account type</label>
          </div>
          {user.role === "student" && (
            <div className='form-floating mb-3 border-dark w-50'>
              <select
                className='form-select'
                id='floatingSelect'
                name='cls'
                value={user.cls}
                onChange={handleChange}
                required>
                <ClassList />
              </select>
              <label
                htmlFor='floatingSelect'
                className='text-skyblue fw-bolder'>
                Class
              </label>
            </div>
          )}
          <button className='btn btn-success'>Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
