import React from 'react';
import './register.css';

const Register = () => {
  return (
    <section className="register">
      <div className="register__title-body">
        <h1 className="register__title">Cadastro</h1>
      </div>
      <form method="POST" className="register__form">
        <div className="register__form-first-group">
          <div className="register__form-item">
            <label htmlFor="" className="register__label">Nome</label>
            <input type="text" className="register__input"/>
          </div>
          <div className="register__form-item">
            <label htmlFor="" className="register__label">Email</label>
            <input type="email" className="register__input"/>
          </div>
          <div className="register__form-item">
            <label htmlFor="" className="register__label">CPF</label>
            <input type="text" className="register__input"/>
          </div>
          <div className="register__form-item-group">
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Endereço</label>
              <input type="text" className="register__input"/>
            </div>
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Estado</label>
              <input type="text" className="register__input"/>
            </div>
          </div>
          <div>
            <div className="register__form-item">
              <label htmlFor="" className="register__label">CEP</label>
              <input type="text" className="register__input"/>
            </div>
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Cidade</label>
              <input type="text" className="register__input"/>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Register;