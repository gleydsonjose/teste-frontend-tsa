import React, {useState, useEffect} from 'react';

const SelectCustomDuoGroup = ({
  labelText, firstDataList, firstCurrentOption, setFirstCurrentOption, firstSelectError, setFirstSelectError, firstErrorMessage, secondDataList, secondCurrentOption, setSecondCurrentOption, secondSelectError, setSecondSelectError, secondErrorMessage
}) => {
  const [firstSelectStatus, setFirstSelectStatus] = useState(false);
  const [secondSelectStatus, setSecondSelectStatus] = useState(false);

  function changeFirstSelectStatus() {
    setFirstSelectStatus(!firstSelectStatus);
  }

  function changeSecondSelectStatus() {
    setSecondSelectStatus(!secondSelectStatus);
  }

  function changeFirstOptionCustom(idOption, optionName) {
    setFirstCurrentOption({
      id: idOption,
      month: optionName
    });
    setFirstSelectStatus(false);

    if(idOption > 0) {
      setFirstSelectError(false);
    } else {
      setFirstSelectError(true);
    }
  }

  function changeSecondOptionCustom(idOption, optionName) {
    setSecondCurrentOption({
      id: idOption,
      year: optionName
    });
    setSecondSelectStatus(false);

    if(idOption > 0) {
      setSecondSelectError(false);
    } else {
      setSecondSelectError(true);
    }
  }

  function changeFirstOption(event) {
    const inputValue = event.target.value;
    const firstCurrentOptionData = firstDataList.filter(data => data.month === inputValue)[0];
    setFirstCurrentOption({
      id: firstCurrentOptionData.id,
      month: firstCurrentOptionData.month
    });

    if(firstCurrentOptionData.id > 0) {
      setFirstSelectError(false);
    } else {
      setFirstSelectError(true);
    }
  }

  function changeSecondOption(event) {
    const inputValue = event.target.value;
    const secondCurrentOptionData = secondDataList.filter(data => data.year === inputValue)[0];
    setSecondCurrentOption({
      id: secondCurrentOptionData.id,
      year: secondCurrentOptionData.year
    });

    if(secondCurrentOptionData.id > 0) {
      setSecondSelectError(false);
    } else {
      setSecondSelectError(true);
    }
  }

  useEffect(() => {
    if(firstSelectStatus) {
      function firstSelectClickOutside(event) {
        const firstCurrentTargetClass = event.target.classList.value.split(' ')[0];

        if(firstCurrentTargetClass !== 'register__select-custom-option' &&
          firstCurrentTargetClass !== 'register__select-custom-option-item') {
          setFirstSelectStatus(false);
        }
      }
    
      document.addEventListener('click', firstSelectClickOutside);
      return () => document.removeEventListener('click', firstSelectClickOutside);
    }
  }, [firstSelectStatus]);

  useEffect(() => {
    if(secondSelectStatus) {
      function secondSelectClickOutside(event) {
        const secondCurrentTargetClass = event.target.classList.value.split(' ')[0];

        if(secondCurrentTargetClass !== 'register__select-custom-option' &&
          secondCurrentTargetClass !== 'register__select-custom-option-item') {
          setSecondSelectStatus(false);
        }
      }
    
      document.addEventListener('click', secondSelectClickOutside);
      return () => document.removeEventListener('click', secondSelectClickOutside);
    }
  }, [secondSelectStatus]);

  return (
    <div className="register__form-item register__form-item_mid_width">
      <label className="register__label">{labelText}</label>
      <div className="register__select-custom-duo-group">
        <div className="register__select-custom register__select-custom_mid_width">
          <select className="register__select" value={firstCurrentOption.month}
            onChange={changeFirstOption}>
            {firstDataList.map(data => 
              <option className="register__select-option"
                value={data.month} key={data.id}>
                {data.month}
              </option>)}
          </select>
          <div className={`register__select-custom-item${firstSelectError ? ' register__select-custom-item_error' : ''}`} onClick={changeFirstSelectStatus}>
            {firstCurrentOption.month}
            <i className="fas fa-caret-down register__select-custom-icon"></i>
          </div>
          {firstSelectStatus ?
          <ul className="register__select-custom-option">
            {firstDataList.map(data => {
              let firstOptionItemClass = 'register__select-custom-option-item';

              if(data.month === firstCurrentOption.month) {
                firstOptionItemClass += ' register__select-custom-option-item_active';
              } else {
                firstOptionItemClass += '';
              }
               
              return <li className={firstOptionItemClass} key={data.id}
                onClick={() => changeFirstOptionCustom(data.id, data.month)}>{data.month}</li>
            })}
          </ul> : ''}
        </div>
        <div className="register__select-custom register__select-custom_mid_width">
          <select className="register__select" value={secondCurrentOption.year}
            onChange={changeSecondOption}>
            {secondDataList.map(data => 
              <option className="register__select-option"
                value={data.year} key={data.id}>
                {data.year}
              </option>)}
          </select>
          <div className={`register__select-custom-item${secondSelectError ? ' register__select-custom-item_error' : ''}`} onClick={changeSecondSelectStatus}>
            {secondCurrentOption.year}
            <i className="fas fa-caret-down register__select-custom-icon"></i>
          </div>
          {secondSelectStatus ?
          <ul className="register__select-custom-option">
            {secondDataList.map(data => {
              let secondOptionItemClass = 'register__select-custom-option-item';

              if(data.year === secondCurrentOption.year) {
                secondOptionItemClass += ' register__select-custom-option-item_active';
              } else {
                secondOptionItemClass += '';
              }
               
              return <li className={secondOptionItemClass} key={data.id}
                onClick={() => changeSecondOptionCustom(data.id, data.year)}>{data.year}</li>
            })}
          </ul> : ''}
        </div>
      </div>
      <div className="register__list-error-message">
        {firstSelectError &&
          <p className="register__error-message">{firstErrorMessage}</p>}
        {secondSelectError &&
          <p className="register__error-message">{secondErrorMessage}</p>}
      </div>
    </div>
  );
}

export default SelectCustomDuoGroup;