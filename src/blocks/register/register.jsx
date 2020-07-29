import React, {useState, useEffect} from 'react';
import './register.css';

const SelectCustom = ({
  stateList, optionDefault
}) => {
  const [selectStatus, setSelectStatus] = useState(false);
  const [currentOption, setCurrentOption] = useState(optionDefault);

  console.log(stateList);

  function changeSelectStatus() {
    setSelectStatus(!selectStatus);
  }

  function changeOption(event) {
    setCurrentOption(event.target.value)
  }

  function changeOptionCustom(option) {
    setCurrentOption(option);
    setSelectStatus(false);
  }

  useEffect(() => {
    if(selectStatus) {
      function selectClickOutside(event) {
        const currentTargetClass = event.target.classList.value.split(' ')[0];

        if(currentTargetClass !== 'register__select-custom-option' &&
          currentTargetClass !== 'register__select-custom-option-item') {
          setSelectStatus(false);
        }
      }
    
      document.addEventListener('click', selectClickOutside);
      return () => document.removeEventListener('click', selectClickOutside);
    }
  }, [selectStatus]);

  return (
    <div className="register__form-item register__form-item_mid_width">
      <label htmlFor="" className="register__label">Estado</label>
      <div className="register__select-custom">
        <div className="register__select-custom-item" onClick={changeSelectStatus}>
          {currentOption}
          <i className="fas fa-caret-down register__select-custom-icon"></i>
        </div>
        <select className="register__select"
          value={currentOption} onChange={changeOption}>
          {stateList.map(state => 
            <option className="register__select-option"
              value={state.nome} key={state.id}>{state.nome}</option>)}
        </select>
        {selectStatus ?
          <ul className="register__select-custom-option">
            {stateList.map(state => {
              let optionItemClass = 'register__select-custom-option-item'
              
              if(state.nome === currentOption) {
                optionItemClass += ' register__select-custom-option-item_active'
              } else {
                optionItemClass += '';
              }
               
              return <li className={optionItemClass} key={state.id}
                onClick={() => changeOptionCustom(state.nome)}>{state.nome}</li>
            })}
          </ul> : ''}
      </div>
    </div>
  );
}

const Register = () => {
  const [stateList, setStateList] = useState([]);
  const [inputName, setInputName] = useState('');

  function changeInputName(event) {
    const inputValue = event.target.value;
    setInputName(inputValue);
  }

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(data => {
        data.json()
          .then(estados => setStateList(estados));
      })
      .catch(error => console.error('API não foi encontrada!', error));
  }, []);

  return (
    <section className="register">
      <div className="register__title-body">
        <h1 className="register__title">Cadastro</h1>
      </div>
      <form method="POST" className="register__form">
        <div className="register__form-first-group">
          <div className="register__form-item">
            <label htmlFor="" className="register__label">Nome</label>
            <input type="text" className="register__input"
              onChange={changeInputName} maxLength="100"/>
          </div>
          <div className="register__form-item">
            <label htmlFor="" className="register__label">Email</label>
            <input type="email" className="register__input"/>
          </div>
          <div className="register__form-item">
            <label htmlFor="" className="register__label">CPF</label>
            <input type="text" className="register__input" placeholder="111.111.111-01"/>
          </div>
          <div className="register__form-item-group">
            <div className="register__form-item register__form-item_mid_width">
              <label htmlFor="" className="register__label">Endereço</label>
              <input type="text" className="register__input" placeholder="Rua, Número e Bairro"/>
            </div>
            <SelectCustom
              stateList={stateList}
              optionDefault="Selecione o Estado"/>
          </div>
          <div className="register__form-item-group">
            <div className="register__form-item register__form-item_mid_width">
              <label htmlFor="" className="register__label">CEP</label>
              <input type="text" className="register__input" placeholder="22.222-000"/>
            </div>
            <div className="register__form-item register__form-item_mid_width">
              <label htmlFor="" className="register__label">Cidade</label>
              <select className="register__select2" defaultValue="default">
                <option value="default">Selecione a Cidade</option>
                <option value="SP">São Paulo</option>
                <option value="Recife">Recife</option>
              </select>
            </div>
          </div>
        </div>
        <div className="register__form-last-group">
          <div className="">
            <h1>Forma de Pagamento</h1>
          </div>
          <div>
            <div>
              <input type="radio"/>
              <label htmlFor="">Cartão no Cartão</label>
            </div>
            <div>
              <input type="radio"/>
              <label htmlFor="">Boleto Bancário</label>
            </div>
          </div>
          <div className="register__form-item-group">
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Nome no Cartão</label>
              <input type="text" className="register__input"/>
            </div>
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Data de Expiração</label>
              <input type="text" className="register__input"/>
              <input type="text" className="register__input"/>
            </div>
          </div>
          <div className="register__form-item-group">
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Número do Cartão</label>
              <input type="text" className="register__input"/>
            </div>
            <div className="register__form-item">
              <label htmlFor="" className="register__label">Código de Segurança</label>
              <input type="text" className="register__input"/>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Register;