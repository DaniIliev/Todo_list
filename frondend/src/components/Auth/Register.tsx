import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/userApi';


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      registerUser(username, password)
    };

    
  return (
        <div className="register container">
            <h2 className="register__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="form register__form">
                <label htmlFor="username" className="form__label">Потребител</label>
                <input 
                    type="text" 
                    className="form__input" 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password" className="form__label"></label>
                <input
                className="form__input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn register__button" type="submit">Създай акаунт</button>
            </form>
        </div>
  )
}

export default Register