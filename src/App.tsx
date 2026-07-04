import { useState, type FormEvent } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'

 function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [authError, setAuthError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setEmailError('')
    setPasswordError('')
    setAuthError('')


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
      setIsSubmitting(false)
      return
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      setAuthError(data.error ?? 'Something went wrong')
      setIsSubmitting(false)
      return
    }

    setIsLoggedIn(false)
    setIsSubmitting(false)
    setIsRedirecting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsRedirecting(false)
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setEmail('')
    setPassword('')
    setEmailError('')
    setPasswordError('')
    setAuthError('')
    localStorage.removeItem('isLoggedIn')
  }

  if (isRedirecting) {
    return (
      <main>
        <section>
          <h1 data-testid="redirecting-heading">Redirecting...</h1>
        </section>
      </main>
    )
  }

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />
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
        isSubmitting={isSubmitting}
        authError={authError}
      />
    )
}

export default App