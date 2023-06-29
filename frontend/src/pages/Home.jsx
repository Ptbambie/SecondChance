import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import './home.css';
import Login from '../components/login/Login';

const Home = () => {
  const [loginPage, setLoginPage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginPage(true);
  };

  const handleClick = () => {
    setLoginPage(false);
  };

  return (
    <div className='home'>
      {loginPage && <Login handleClick={handleClick} />}
      <div className='text-presentation'>
        <h1>
          L'accès à la technologie pour tous,{' '}
          <span style={{ color: 'var(--second-color)' }}>un smartphone</span> à
          la fois.
        </h1>
        <p>
          Ensemble, nous sommes déterminés à faire une différence dans la vie
          des personnes exclues, en leur offrant les opportunités et les outils
          nécessaires pour s'épanouir dans le monde numérique.
        </p>
        <button className='login-btn' onClick={handleSubmit}>
          Se connecter
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
