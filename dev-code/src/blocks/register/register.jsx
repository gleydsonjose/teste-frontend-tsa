import React, {useState, useEffect} from 'react';
import './register.css';

const FormItem = ({
  idAttribute, labelText, inputError, changeInput, maxLength, errorMessage, type = 'text', placeholder = '', classNameItem = 'register__form-item'
}) => {
  return (
    <div className={classNameItem}>
      <label htmlFor={idAttribute} className="register__label">{labelText}</label>
      <input type={type} className={`register__input${inputError ? ' register__input_error' : ''}`}
        onChange={changeInput} maxLength={maxLength} id={idAttribute} placeholder={placeholder}/>
      {inputError &&
        <p className="register__error-message">{errorMessage}</p>}
    </div>
  );
}

const SelectCustom = ({
  dataList, currentOption, setCurrentOption, selectError, errorMessage
}) => {
  const [selectStatus, setSelectStatus] = useState(false);

  function changeSelectStatus() {
    setSelectStatus(!selectStatus);
  }

  function changeOption(event) {
    const inputValue = event.target.value;
    const currentOptionData = dataList.filter(data => data.nome === inputValue)[0];
    setCurrentOption({
      id: currentOptionData.id,
      nome: currentOptionData.nome
    });
  }

  function changeOptionCustom(idOption, optionName) {
    setCurrentOption({
      id: idOption,
      nome: optionName
    });
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
        <select className="register__select" value={currentOption.nome}
          onChange={changeOption}>
          {dataList.map(data => 
            <option className="register__select-option"
              value={data.nome} key={data.id}>
              {data.nome}
            </option>)}
        </select>
        <div className={`register__select-custom-item${selectError ? ' register__select-custom-item_error' : ''}`} 
        onClick={changeSelectStatus}>
          {currentOption.nome}
          <i className="fas fa-caret-down register__select-custom-icon"></i>
        </div>
        {selectStatus ?
          <ul className="register__select-custom-option">
            {dataList.map(data => {
              let optionItemClass = 'register__select-custom-option-item'
              
              if(data.nome === currentOption.nome) {
                optionItemClass += ' register__select-custom-option-item_active'
              } else {
                optionItemClass += '';
              }
               
              return <li className={optionItemClass} key={data.id}
                onClick={() => changeOptionCustom(data.id, data.nome)}>{data.nome}</li>
            })}
          </ul> : ''}
          {selectError &&
            <p className="register__error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

const Register = () => {
  const [inputName, setInputName] = useState('');
  const [inputNameError, setInputNameError] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailError, setInputEmailError] = useState(false);
  const [inputCpf, setInputCpf] = useState('');
  const [inputCpfError, setInputCpfError] = useState(false);
  const [inputAddress, setInputAddress] = useState('');
  const [inputAddressError, setInputAddressError] = useState(false);
  const [stateList, setStateList] = useState([]);
  const stateOptionDefault = {id: 0, nome: 'Selecione o Estado'};
  const [stateCurrentOption, setStateCurrentOption] = useState(stateOptionDefault);
  const [selectStateError, setSelectStateError] = useState(true);

  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(data => {
        data.json()
          .then(estados => {
            let newStateList = estados.slice();
            newStateList.unshift(stateOptionDefault);
            setStateList(newStateList);
          });
      })
      .catch(error => console.error('API não foi encontrada!', error));
  }, []);

  function changeInputName(event) {
    const inputValue = event.target.value;

    if(inputValue.length > 0) {
      setInputNameError(false);
    } else {
      setInputNameError(true);
    }

    setInputName(inputValue);
  }

  function changeInputEmail(event) {
    const inputValue = event.target.value;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(regex.test(inputValue)) {
      setInputEmailError(false);
    } else {
      setInputEmailError(true);
    }

    setInputEmail(inputValue);
  }

  function changeInputCpf(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');

    if(inputValue.length === 11) {
      inputValue = inputValue.replace(/^([\d]{3})?([\d]{3})?([\d]{3})?([\d]{2})/, "$1.$2.$3-$4");
    }

    if(inputValue.length === 14) {
      setInputCpfError(false);
    } else {
      setInputCpfError(true);
    }

    setInputCpf(inputValue);
    event.target.value = inputValue;
  }

  function changeInputAddress(event) {
    const inputValue = event.target.value;

    if(inputValue.length > 0) {
      setInputAddressError(false);
    } else {
      setInputAddressError(true);
    }

    setInputAddress(inputValue);
  }

  return (
    <section className="register">
      <div className="register__title-body">
        <h1 className="register__title">Cadastro</h1>
      </div>
      <form method="POST" className="register__form">
        <div className="register__form-first-group">
          <FormItem idAttribute="register-input-name"
            labelText="Nome" inputError={inputNameError}
            changeInput={changeInputName} maxLength="80"
            errorMessage="Preencha o campo"/>
          <FormItem idAttribute="register-input-email"
            labelText="Email" inputError={inputEmailError}
            changeInput={changeInputEmail} maxLength="100"
            errorMessage="Digite um email válido" type="email"/>
          <FormItem idAttribute="register-input-cpf"
            labelText="CPF" inputError={inputCpfError}
            changeInput={changeInputCpf} maxLength="14"
            errorMessage="Digite um CPF válido" placeholder="111.111.111-01"/>
          <div className="register__form-item-group">
            <FormItem idAttribute="register-input-address"
              labelText="Endereço" inputError={inputAddressError}
              changeInput={changeInputAddress} maxLength="70"
              errorMessage="Preencha o campo" placeholder="Rua, Número e Bairro"
              classNameItem="register__form-item register__form-item_mid_width"/>
            <SelectCustom dataList={stateList}
              currentOption={stateCurrentOption}
              setCurrentOption={setStateCurrentOption}
              selectError={selectStateError}
              errorMessage="Escolha um estado"/>
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