import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './blocks/navbar/navbar';
import Register from './blocks/register/register';
import './index.css';

const App = () => {
  const [currentMainMenuItem, setCurrentMainMenuItem] = useState('register');
  let BodyContainer = '';

  switch(currentMainMenuItem) {
    case 'register':
      BodyContainer = <Register/>;
      break;
    case 'userList':
      //BodyContainer = <UserList/>;
      break;
    default:
      BodyContainer = '';
      break;
  }

  function changeMainMenuItem(menuName) {
    setCurrentMainMenuItem(menuName);
  }

  return (
    <>
      <Navbar
        currentMainMenuItem={currentMainMenuItem}
        changeMainMenuItem={changeMainMenuItem}/>
      {BodyContainer}
    </>
  );
}

ReactDOM.render(<App/>, document.getElementById('main'));