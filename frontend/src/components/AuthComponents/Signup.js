import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TRY_ACTIONS } from "../../redux/action";

const Signup = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(TRY_ACTIONS.SIGNUP(user.username, user.password, user.role)).then(
      (errors) => {
        errors &&
          errors.username !== undefined &&
          setMessage("Username already exists");
      }
    );
  };

  useEffect(() => {
    isLoggedIn ? history.push("/") : (document.title = "Sign Up");
  }, [history, isLoggedIn]);

  return (
    <div className='container'>
      <div className='d-flex justify-content-center my-5'>
        <div className='bg-black my-4 p-5 rounded'>
          {message && (
            <div className='alert alert-danger' role='alert'>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control bg-transparent border-secondary text-light'
                id='floatingInput'
                placeholder='Username'
                name='username'
                value={user.username}
                onChange={handleChange}
                required
              />
              <label className='text-skyblue' htmlFor='floatingInput'>
                Username
              </label>
            </div>
            <div className='form-floating mb-3'>
              <input
                type='password'
                className='form-control bg-transparent border-secondary text-light'
                id='floatingPassword'
                placeholder='Password'
                name='password'
                value={user.password}
                onChange={handleChange}
                autoComplete='on'
                required
              />
              <label className='text-skyblue' htmlFor='floatingPassword'>
                Password
              </label>
            </div>
            <div className='form-floating mb-3'>
              <select
                className='form-select bg-transparent border-secondary text-light'
                id='floatingRole'
                name='role'
                value={user.role}
                onChange={handleChange}
                required>
                <option value='' disabled hidden>
                  I am a
                </option>
                <option className='bg-dark' value='student'>
                  Student
                </option>
                <option className='bg-dark' value='teacher'>
                  Teacher
                </option>
              </select>
              <label className='text-skyblue' htmlFor='floatingRole'>
                Account type
              </label>
            </div>
            <div className='text-center'>
              <button className='btn btn-success w-100'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
