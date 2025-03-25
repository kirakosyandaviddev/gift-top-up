
import { Link } from 'react-router-dom';

import { routes } from '../../consts/routes';

import './WelcomePage.css';


export const WelcomePage = () => {
  return (
    <div className="container">
      <h1 className="title">
        Welcome to <br />
        <span className="gradient-text">Gifts Games</span>
      </h1>

      <div className="terms">
        <span>
          I accept the <a href="#" className="terms-link">Terms of Service</a>
        </span>
      </div>

      <Link to={routes.home} className="connect-wallet">Connect Wallet</Link>
    </div>
  )
}