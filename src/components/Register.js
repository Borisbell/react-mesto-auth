import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password} = formParams;
    props.handleRegister({ email, password })
      .catch(err => {
        setMessage(err.message);
      }
    );
  }

  return (
    <div className="page">
      <div className="register">
        <h1 className="name name_color-white">
          Регистрация
        </h1>
        <p className="register__error">
          {message}
        </p>
        <form onSubmit={handleSubmit} className="register__form">
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" 
                 name="email" 
                 type="email" 
                 value={formParams.email} 
                 onChange={handleChange} 
                 className="popup__input"  
                 required
                 />
          <label htmlFor="password">
            Пароль:
          </label>
          <input id="password"  
              name="password" 
              type="password" 
              value={formParams.password} 
              onChange={handleChange}
              className="popup__input" 
              required/>
          <div className="register__button-container">
            <button type="submit" 
                    className="popup__submit popup__submit_color-white">
                    Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="signin" className="register__login-link">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;