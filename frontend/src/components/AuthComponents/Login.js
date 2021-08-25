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
          response.status === 401 &&
          setMessage("Incorrect username or password")
      )
      .catch((error) => setMessage("Something went wrong"));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    } else {
      document.title = "Login";
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor='floatingPassword'>Password</label>
          </div>
          <button className='btn btn-success'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
