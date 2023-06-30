import React from 'react';
import Logo from '../../assets/logo-la-collecte-tech-emmaus.png';
import { Link } from 'react-router-dom';
import {TbArrowBarToRight} from 'react-icons/tb';
import {BiSolidUser} from 'react-icons/bi';
import './Header.css';

const Header = () => {
  return (
    <nav className='container-header'>
      <ul className='barreNav'>
        <li className='nav-item'>
          <img src={Logo} alt='logo' />
        </li>
        <div className='liens-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/ajout'>Ajouter un smartphone</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/liste'>Liste des smartphones</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/faq'>FAQ</Link>
          </li>
        </div>
        <li className='nav-item'>
          <Link className='nav-connection' to='/dashboard'><BiSolidUser className='nav-user' style={{ width: "2em", height:"2em", color:"#E62460"}}/></Link>
          <span>J. Doe</span>
          <Link className='nav-connection' to='/'><TbArrowBarToRight className= 'nav-exit' style={{ width: "2em", height:"2em"}}/></Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;

