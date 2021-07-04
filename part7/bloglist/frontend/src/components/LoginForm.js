import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'

import { Container, Button, Input } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const login = async (event) => {
    event.preventDefault()
    dispatch(userLogin(username, password))
    setUsername('')
    setPassword('')
  }

  return <Container>
    <div className='comments' style={{ marginTop: 50 }}>
      <form id="form-comment" onSubmit={login}>
        <div><Input placeholder="Username" id="username" value={username} onChange={handleUsernameChange} /></div>
        <div><Input placeholder="Password" id="password" type="password" value={password} onChange={handlePasswordChange} /></div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Button variant="contained" color="primary" id='login-btn' type="submit">Login</Button>
        </div>
      </form>
    </div>
  </Container>
}

export default LoginForm
