import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const login = async (event) => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return <div>
    <h2>Login</h2>
    <form onSubmit={login}>
      <div>
        Username
        <input id='username' value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        Password
        <input id='password' type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button id='login-btn' type="submit">Login</button>
    </form>
  </div>
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
