import React, {useState, useEffect} from 'react';
import FormItem from './components/form-item';
import SelectCustom from './components/select-custom';
import SelectCustomDuoGroup from './components/select-custom-duo-group';
import './register.css';

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
  const [selectStateError, setSelectStateError] = useState(false);
  const [inputCep, setInputCep] = useState('');
  const [inputCepError, setInputCepError] = useState(false);
  const [cityList, setCityList] = useState([]);
  const cityOptionDefault = {id: 0, nome: 'Selecione a Cidade'};
  const [cityCurrentOption, setCityCurrentOption] = useState(cityOptionDefault);
  const [selectCityError, setSelectCityError] = useState(false);
  const [paymentForm, setPaymentForm] = useState('card');
  const [inputCardName, setInputCardName] = useState('');
  const [inputCardNameError, setInputCardNameError] = useState(false);
  const [monthList, setMonthList] = useState([]);
  const monthOptionDefault = {id: 0, month: 'Mês'};
  const [monthCurrentOption, setMonthCurrentOption] = useState(monthOptionDefault);
  const [selectMonthError, setSelectMonthError] = useState(false);
  const [yearList, setYearList] = useState([]);
  const yearOptionDefault = {id: 0, year: 'Ano'};
  const [yearCurrentOption, setYearCurrentOption] = useState(yearOptionDefault);
  const [selectYearError, setSelectYearError] = useState(false);
  const [inputCardNumber, setInputCardNumber] = useState('');
  const [inputCardNumberError, setInputCardNumberError] = useState(false);
  const [inputSafeCode, setInputSafeCode] = useState('');
  const [inputSafeCodeError, setInputSafeCodeError] = useState(false);

  useEffect(() => {
    // List for states
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(data => {
        data.json()
          .then(estados => {
            let newStateList = estados.slice();
            newStateList.unshift(stateOptionDefault);
            setStateList(newStateList);
          });
      })
      .catch(error => console.error('API não foi encontrada! State Error!', error));

    // List for cities
    if(stateCurrentOption.id !== 0) {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateCurrentOption.id}/municipios`)
      .then(data => {
        data.json()
          .then(municipios => {
            let newCityList = municipios.slice();
            newCityList.unshift(cityOptionDefault);
            setCityList(newCityList);
          });
      })
      .catch(error => console.error('API não foi encontrada! City Error!', error));
    } else {
      setCityCurrentOption(cityOptionDefault);
      setCityList([]);
    }

    // List for months
    let oldMonthList = require('../../api/months.json');
    let newMonthList = oldMonthList.slice();
    newMonthList.unshift(monthOptionDefault);
    setMonthList(newMonthList);

    // List for years
    let oldYearList = require('../../api/years.json');
    let newYearList = oldYearList.slice();
    newYearList.unshift(yearOptionDefault);
    setYearList(newYearList);
  }, [stateCurrentOption]);

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

  function changeInputCep(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');

    if(inputValue.length === 8) {
      inputValue = inputValue.replace(/^([\d]{2})?([\d]{3})?([\d]{3})/, "$1.$2-$3");
    }

    if(inputValue.length === 10) {
      setInputCepError(false);
    } else {
      setInputCepError(true);
    }

    setInputCep(inputValue);
    event.target.value = inputValue;
  }

  function changePaymentForm(event) {
    const radioValue = event.target.value;

    if(radioValue === 'boleto') {
      setInputCardNameError(false);
      setSelectMonthError(false);
      setSelectYearError(false);
      setInputCardNumberError(false);
      setInputSafeCodeError(false);
    }

    setPaymentForm(radioValue);
  }

  function changeInputCardName(event) {
    const inputValue = event.target.value;

    if(inputValue.length > 0) {
      setInputCardNameError(false);
    } else {
      setInputCardNameError(true);
    }

    setInputCardName(inputValue);
  }

  function changeInputCardNumber(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');

    if(inputValue.length === 16) {
      inputValue = inputValue.replace(/^([\d]{4})?([\d]{4})?([\d]{4})?([\d]{4})/, "$1 $2 $3 $4");
    }

    if(inputValue.length === 19) {
      setInputCardNumberError(false);
    } else {
      setInputCardNumberError(true);
    }

    setInputCardNumber(inputValue);
    event.target.value = inputValue;
  }

  function changeInputSafeCode(event) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');

    if(inputValue.length === 3) {
      setInputSafeCodeError(false);
    } else {
      setInputSafeCodeError(true);
    }

    setInputSafeCode(inputValue);
    event.target.value = inputValue;
  }

  function submitData(event) {
    event.preventDefault();
    const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let userData = {};

    if(inputName.length === 0) {
      setInputNameError(true);
    }

    if(!regexEmail.test(inputEmail)) {
      setInputEmailError(true);
    }

    if(inputCpf.length < 14) {
      setInputCpfError(true);
    }

    if(inputAddress.length === 0) {
      setInputAddressError(true);
    }

    if(stateCurrentOption.id === 0) {
      setSelectStateError(true);
    }

    if(inputCep.length < 10) {
      setInputCepError(true);
    }

    if(cityCurrentOption.id === 0) {
      setSelectCityError(true);
    }

    if(paymentForm === 'card') {
      if(inputCardName.length === 0) {
        setInputCardNameError(true);
      }

      if(monthCurrentOption.id === 0) {
        setSelectMonthError(true);
      }

      if(yearCurrentOption.id === 0) {
        setSelectYearError(true);
      }

      if(inputCardNumber.length === 0) {
        setInputCardNumberError(true);
      }

      if(inputSafeCode.length < 3) {
        setInputSafeCodeError(true);
      }
    }

    /*if(paymentForm === 'card') {
      if(!inputNameError, !inputEmailError, !inputCpfError,
        !inputAddressError, !selectStateError, !inputCepError,
        !selectCityError) {
        userData = {
          ...userData,
          id: 
        }
      }
    } else if(paymentForm === 'boleto') {
      if(!inputCardNameError, !selectMonthError, !selectYearError,
        !inputCardNumberError, !inputSafeCodeError) {
    }*/

    console.log(inputName);
    console.log(inputEmail);
    console.log(inputCpf);
    console.log(inputAddress);
    console.log(inputCep);
    console.log(stateCurrentOption.nome);
    console.log(cityCurrentOption.nome);
    console.log(paymentForm);
    console.log(inputCardName);
    console.log(monthCurrentOption.month);
    console.log(yearCurrentOption.year);
    console.log(inputCardNumber);
    console.log(inputSafeCode);
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
            <SelectCustom idAttribute="register-select-state"
              labelText="Estado" dataList={stateList}
              currentOption={stateCurrentOption}
              setCurrentOption={setStateCurrentOption}
              selectError={selectStateError}
              setSelectError={setSelectStateError}
              errorMessage="Escolha um estado"/>
          </div>
          <div className="register__form-item-group">
            <FormItem idAttribute="register-input-cep"
              labelText="CEP" inputError={inputCepError}
              changeInput={changeInputCep} maxLength="10"
              errorMessage="Digite um CEP válido" placeholder="22.222-000"
              classNameItem="register__form-item register__form-item_mid_width"/>
            <SelectCustom idAttribute="register-select-city"
              labelText="Cidade" dataList={cityList}
              currentOption={cityCurrentOption}
              setCurrentOption={setCityCurrentOption}
              selectError={selectCityError}
              setSelectError={setSelectCityError}
              errorMessage="Escolha uma cidade"/>
          </div>
        </div>
        <div className="register__form-last-group">
          <div className="register__payment-form-title-body">
            <h1 className="register__payment-form-title">Forma de Pagamento</h1>
          </div>
          <div className="register__radio-btn-group">
            <div className="register__radio-btn-item">
              <input type="radio" className="register__radio-btn-input"
                id="register__radio-btn-card" name="payment-form" value="card" onChange={changePaymentForm} checked={paymentForm === 'card' && true}/>
              <label htmlFor="register__radio-btn-card"
                className="register__radio-btn-label">Cartão de Crédito</label>
            </div>
            <div className="register__radio-btn-item">
              <input type="radio" className="register__radio-btn-input"
                id="register__radio-btn-boleto" name="payment-form" value="boleto" onChange={changePaymentForm} checked={paymentForm === 'boleto' && true}/>
              <label htmlFor="register__radio-btn-boleto"
                className="register__radio-btn-label">Boleto Bancário</label>
            </div>
          </div>
          {paymentForm === 'card' &&
          <>
            <div className="register__form-item-group">
              <FormItem idAttribute="register-input-card-name"
                labelText="Nome no Cartão" inputError={inputCardNameError}
                changeInput={changeInputCardName} maxLength="80"
                errorMessage="Preencha o campo" placeholder="Nome impresso no cartão"
                classNameItem="register__form-item register__form-item_mid_width"/>
              <SelectCustomDuoGroup labelText="Data de Expiração"
                firstDataList={monthList}
                firstCurrentOption={monthCurrentOption}
                setFirstCurrentOption={setMonthCurrentOption}
                firstSelectError={selectMonthError}
                setFirstSelectError={setSelectMonthError}
                firstErrorMessage="Escolha um mês"
                secondDataList={yearList}
                secondCurrentOption={yearCurrentOption}
                setSecondCurrentOption={setYearCurrentOption}
                secondSelectError={selectYearError}
                setSecondSelectError={setSelectYearError}
                secondErrorMessage="Escolha um ano"/>
            </div>
            <div className="register__form-item-group">
              <FormItem idAttribute="register-input-card-number"
                labelText="Numero do Cartão" inputError={inputCardNumberError}
                changeInput={changeInputCardNumber} maxLength="19"
                errorMessage="Digite o número válido" placeholder="5555 5555 5555 5555"
                classNameItem="register__form-item register__form-item_mid_width"/>
              <FormItem idAttribute="register-input-safe-code"
                labelText="Código de Segurança" inputError={inputSafeCodeError}
                changeInput={changeInputSafeCode} maxLength="3"
                errorMessage="Digite um código válido" placeholder="XXX"
                classNameItem="register__form-item register__form-item_mid_width"/>
            </div>
          </>}
        </div>
        <div className="register__form-footer">
          <p className="register__form-footer-warning">Seu cartão será debitado em R$ 49,00</p>
          <button type="submit" className="register__form-footer-submit" onClick={submitData}>REALIZAR MATRÍCULA</button>
          <p className="register__form-footer-info">Informações seguras e criptografadas</p>
        </div>
      </form>
    </section>
  );
}

export default Register;