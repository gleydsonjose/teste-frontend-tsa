import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './blocks/navbar/navbar';
import Register from './blocks/register/register';
import CustomerList from './blocks/customer-list/customer-list';
import Footer from './blocks/footer/footer';
import './index.css';

const App = () => {
  const [currentMainMenuItem, setCurrentMainMenuItem] = useState('register');
  const [customerList, setCustomerList] = useState([]);
  let BodyContainer = '';

  switch(currentMainMenuItem) {
    case 'register':
      BodyContainer = <Register customerList={customerList}
        setCustomerList={setCustomerList}/>;
      break;
    case 'customer-list':
      BodyContainer = <CustomerList customerList={customerList}/>;
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
      <Footer/>
    </>
  );
}

ReactDOM.render(<App/>, document.getElementById('main'));