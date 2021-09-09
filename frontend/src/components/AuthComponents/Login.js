import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TRY_ACTIONS } from "../../redux/action";

const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(TRY_ACTIONS.LOGIN(username, password))
      .then(
        (response) =>
          response.data.user.token === null &&
          setMessage("Incorrect credentials")
      )
      .catch((error) => setMessage("Something went wrong"));
  };

  useEffect(() => {
    isLoggedIn ? history.push("/") : (document.title = "Login");
  }, [history, isLoggedIn]);

  return (
    <div className='container'>
      <div className='d-flex justify-content-center my-3'>
        <div className='bg-black my-4 p-5 rounded'>
          {message && (
            <div className='alert alert-danger' role='alert'>
              {message}
            </div>
          )}
          <p className='text-center styledFont text-light fs-1'>
            <i className='bi bi-unlock' />
            <br />
            Log In
          </p>
          <form onSubmit={handleSubmit}>
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control bg-transparent border-secondary text-light'
                id='floatingInput'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='on'
                required
              />
              <label className='text-skyblue' htmlFor='floatingPassword'>
                Password
              </label>
            </div>
            <div className='text-center'>
              <button className='btn btn-success w-100'>
                <i className='bi bi-chevron-double-right' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
