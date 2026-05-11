import { useState, type FormEvent } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setEmailError('')
    setPasswordError('')
    setSuccessMessage('')

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

    setSuccessMessage('Login successful')

    console.log({ email, password })
  }

  return (
    <main>
      <section>
        <h1>Login</h1>
        <p>Use your test credentials to continue.</p>

        <form onSubmit={handleSubmit} data-testid="login-form">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              data-testid="email-input"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {emailError && <p data-testid="email-error">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              data-testid="password-input"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {passwordError && <p data-testid="password-error">{passwordError}</p>}
          </div>

          <button type="submit" data-testid="submit-button">Sign in</button>
          {successMessage && <p data-testid="success-message">{successMessage}</p>}
        </form>
      </section>
    </main>
  )
}

export default App