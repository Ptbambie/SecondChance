import React, { useState } from 'react';
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ handleClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    const url = process.env.REACT_APP_BACKEND_URL;
    event.preventDefault();
    if (
      event.target.username.value === '' ||
      event.target.password.value === ''
    ) {
      alert("Merci de remplir le nom d'utilisateur et le mot de passe");
    } else {
      axios
        .post(
          `${url}/api/login`,
          {
            username: event.target.username.value,
            password: event.target.password.value,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            navigate('/accueil');
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.data.error);
        });
    }
  };

  return (
    <div className='login-modal'>
      <form className='login-form' onSubmit={handleSubmit}>
        <IoCloseSharp className='close-login' onClick={handleClick} />
        <h2>Se connecter</h2>
        <label htmlFor='username' required>
          <h3>Identifiant:</h3>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='MDupont12345'
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label htmlFor='password' required>
          <h3>Password:</h3>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='********'
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <input type='submit' value='Login' className='login-btn' />
      </form>
    </div>
  );
};

export default Login;
