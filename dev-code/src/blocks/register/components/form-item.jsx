import React from 'react';

const FormItem = ({
  idAttribute, labelText, inputError, changeInput, maxLength, errorMessage, type = 'text', placeholder = '', classNameItem = 'register__form-item', inputValue
}) => {
  return (
    <div className={classNameItem}>
      <label htmlFor={idAttribute} className="register__label">{labelText}</label>
      <input type={type} className={`register__input${inputError ? ' register__input_error' : ''}`}
        onChange={changeInput} maxLength={maxLength} id={idAttribute} placeholder={placeholder}
        value={inputValue}/>
      {inputError &&
        <p className="register__error-message">{errorMessage}</p>}
    </div>
  );
}

export default FormItem;