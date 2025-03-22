import React, { useState } from "react"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({username, password})
  }
  return (
    <div className='login container'>
        <h2 className="login__title">Вход</h2>
        <form className="form login__form" onSubmit={handleSubmit}>
            <label htmlFor="username" className="form__label">Потребител</label>
            <input 
                type="text" 
                className="form__input" 
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="password" className="form__label">Парола</label>
                <input 
                    type="password" 
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <button className="btn login__button" type='submit'>Влез</button>
        </form>
    </div>
  )
}

export default Login