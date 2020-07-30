import React from 'react';
import './customer-list.css';

const CustomerList = () => {
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
            id="customer-list-search-bar"/>
        </div>
      </div>
    </section>
  );
}

export default CustomerList;