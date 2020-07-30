import React from 'react';
import './navbar.css';

const MainMenuItem = ({
  mainMenuName, text, iconClass, currentMainMenuItem, changeMainMenuItem
}) => {
  const mainMenuItemClass = `navbar__main-menu-item${mainMenuName === currentMainMenuItem ? ' navbar__main-menu-item_active' : ''}`;

  return (
    <li className={mainMenuItemClass} onClick={() => changeMainMenuItem(mainMenuName)}>
      <i className={`${iconClass} navbar__main-menu-icon`}></i>
      {text}
    </li>
  );
}

const Navbar = ({
  currentMainMenuItem, changeMainMenuItem
}) => {
  return (
    <nav className="navbar">
      <ul className="navbar__main-menu">
        <MainMenuItem mainMenuName="customer-list"
          text="Lista" iconClass="fas fa-list"
          currentMainMenuItem={currentMainMenuItem}
          changeMainMenuItem={changeMainMenuItem}/>
        <MainMenuItem mainMenuName="register" 
          text="Cadastro" iconClass="fas fa-user-plus"
          currentMainMenuItem={currentMainMenuItem}
          changeMainMenuItem={changeMainMenuItem}/>
      </ul>
    </nav>
  );
}

export default Navbar;