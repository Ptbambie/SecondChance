import React, { useState } from 'react';
import Footer from '../components/footer/Footer';
import './landing.css';
import Login from '../components/login/Login';

const Landing = () => {
  const [loginPage, setLoginPage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginPage(true);
  };

  const handleClick = () => {
    setLoginPage(false);
  };

  return (
    <div className='landing-page'>
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

export default Landing;
