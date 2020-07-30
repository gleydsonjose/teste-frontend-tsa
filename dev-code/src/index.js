import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './blocks/navbar/navbar';
import Register from './blocks/register/register';
import CustomerList from './blocks/customer-list/customer-list';
import Footer from './blocks/footer/footer';
import './index.css';

const list = [
  {
    id: 0,
    name: "Gleydson",
    email: "gleydsonjosedasilva@hotmail.com",
    cpf: "123.456.789-01",
    address: "Rua teste",
    cep: "12.345-678",
    state: "Pernambuco",
    city: "Jaboatão dos Guararapes",
    paymentForm: "card",
    cardName: "Itau",
    cardMonth: "Janeiro",
    cardYear: 2025,
    cardNumber: "1234 5678 9012 3456",
    safeCode: 123,
    registerDate: "30-09-2020"
  },
  {
    id: 1,
    name: "silva",
    email: "silva@hotmail.com",
    cpf: "456.789.789-01",
    address: "Rua teste 2",
    cep: "89.675-678",
    state: "São Paulo",
    city: "São Paulo",
    paymentForm: "card",
    cardName: "Itau",
    cardMonth: "Fevereiro",
    cardYear: 2029,
    cardNumber: "0976 4562 9012 3456",
    safeCode: 432,
    registerDate: "15-12-2020"
  }
]

const App = () => {
  const [currentMainMenuItem, setCurrentMainMenuItem] = useState('register');
  const [customerList, setCustomerList] = useState([]);
  let BodyContainer = '';

  useEffect(() => {
    setCustomerList(list);
  }, [])

  switch(currentMainMenuItem) {
    case 'register':
      BodyContainer = <Register/>;
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