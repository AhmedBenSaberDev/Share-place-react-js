import { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../store/auth-context';

import "./NavBar.css";

require('./NavBar.css');

const NavBar = () => {

  let navigate = useNavigate(); 

  const authCtx = useContext(AuthContext);

  function logoutHandler(e){
    e.preventDefault();
    authCtx.logout();
    navigate('/auth');
  }


  return (
    <nav className="navbar navbar-expand-lg fixed-top py-3">
      <div className="container">
        <Link to='/' className="navbar-brand text-uppercase font-weight-bold">
          YourPlaces
        </Link>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler navbar-toggler-right"
        >
          <i className="fa fa-bars"></i>
        </button>

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
        { authCtx.isLoggedIn && 
        <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
              <NavLink to='/' className="nav-link text-uppercase font-weight-bold">
                All Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to= {authCtx.userId + '/places'} className="nav-link text-uppercase font-weight-bold">
                My Places
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/places/new' className="nav-link text-uppercase font-weight-bold">
                Add Place
              </NavLink>
            </li>
            <li className="nav-item">
              <Link onClick={logoutHandler} to='' className="nav-link text-uppercase font-weight-bold">
                Logout
              </Link>
            </li>
          </ul> }
          
        {  !authCtx.isLoggedIn &&
        <ul className="navbar-nav ml-auto">
            
        <li className="nav-item">
          <NavLink to='/' className="nav-link text-uppercase font-weight-bold">
            All Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/auth' className="nav-link text-uppercase font-weight-bold">
            Login
          </NavLink>
        </li>
      </ul> }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
