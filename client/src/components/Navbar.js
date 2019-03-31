import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-dark bg-dark">
    <NavLink className="navbar-brand" to="/">
      Navbar
    </NavLink>
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/search">
          Search
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signin">
          Signin
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">
          Signup
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
