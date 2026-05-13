import { useState, type FormEvent } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setEmailError('')
    setPasswordError('')
    setIsLoggedIn(false)


    let hasError = false

    if (!email) {
      setEmailError('Email is required')
      hasError = true
    }

    if (!password) {
      setPasswordError('Password is required')
      hasError = true
    }

    if (hasError) {
      return
    }

    setIsLoggedIn(true)

    console.log({ email, password })
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />
  }

    return (
      <LoginForm
        email={email}
        password={password}
        emailError={emailError}
        passwordError={passwordError}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
    )
}

export default App