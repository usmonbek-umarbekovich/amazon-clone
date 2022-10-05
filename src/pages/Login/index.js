import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleRegister = e => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(auth => {
        console.log(auth);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"
          alt="Amazon"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form onSubmit={handleSubmit}>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice
        </p>

        <button className="login__registerButton" onClick={handleRegister}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}
export default Login;
