import React, {useState, useEffect} from 'react';

const SelectCustom = ({
  idAttribute, labelText, dataList, currentOption, setCurrentOption, selectError, setSelectError, errorMessage
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

    if(currentOptionData.id > 0) {
      setSelectError(false);
    } else {
      setSelectError(true);
    }
  }

  function changeOptionCustom(idOption, optionName) {
    setCurrentOption({
      id: idOption,
      nome: optionName
    });
    setSelectStatus(false);

    if(idOption > 0) {
      setSelectError(false);
    } else {
      setSelectError(true);
    }
  }

  function labelOpenSelect() {
    setSelectStatus(true);
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
      <label htmlFor={idAttribute} className="register__label"
        onClick={labelOpenSelect}>{labelText}</label>
      <div className="register__select-custom">
        <select className="register__select" value={currentOption.nome}
          onChange={changeOption} id={idAttribute}>
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

export default SelectCustom;