import React, {useState, useEffect} from 'react';
import './customer-list.css';

const CustomerList = ({
  customerList
}) => {
  const [searchBarData, setSearchBarData] = useState('');
  const [customerListFiltered, setCustomerListFiltered] = useState([]);

  useEffect(()=> {
    setCustomerListFiltered(customerList);
  }, [customerList])

  function changeSearchBarData(event) {
    const searchBarValue = event.target.value;
    const searchBarRegex = new RegExp(`^${searchBarValue}`, 'i');
    const newCustomerList = customerList.filter(customer => searchBarRegex.test(customer.name) && customer.name);
    setCustomerListFiltered(newCustomerList);
    setSearchBarData(searchBarValue);
  }

  return (
    <section className="customer-list">
      <div className="customer-list__title-body">
        <h1 className="customer-list__title">Lista</h1>
      </div>
      <div className="customer-list__main-body">
        <div className="customer-list__main-title-body">
          <h1 className="customer-list__main-title">Lista de clientes</h1>
        </div>
        <div className="customer-list__main-search-bar">
          <label htmlFor="customer-list-search-bar"
            className="customer-list__main-search-bar-label">Nome do Cliente</label>
          <input type="text" className="customer-list__search-bar-input"
            id="customer-list-search-bar" onChange={changeSearchBarData}
            value={searchBarData} maxLength="80"/>
        </div>
        <table className="customer-list__table">
          <thead className="customer-list__table-header">
            <tr className="customer-list__table-header-row">
              <th className="customer-list__table-header-item">Nome</th>
              <th className="customer-list__table-header-item">Email</th>
              <th className="customer-list__table-header-item">Cpf</th>
              <th className="customer-list__table-header-item">Criado em</th>
            </tr>
          </thead>
          <tbody className="customer-list__table-body">
            {customerListFiltered.map(customer =>
              <tr className="customer-list__table-body-row" key={customer.id}>
                <td className="customer-list__table-body-item">{customer.name}</td>
                <td className="customer-list__table-body-item">{customer.email}</td>
                <td className="customer-list__table-body-item">{customer.cpf}</td>
                <td className="customer-list__table-body-item">{customer.registerDate}</td>
              </tr>)}
          </tbody>
        </table>
        {customerListFiltered.length === 0 &&
          <p className="customer-list__empty-list-warning">Não há usuários cadastrados</p>}
      </div>
    </section>
  );
}

export default CustomerList;