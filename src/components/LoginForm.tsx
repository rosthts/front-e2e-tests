type LoginFormProps = {
    email: string
    password: string
    emailError: string
    passwordError: string
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  }
  
  function LoginForm({
    email,
    password,
    emailError,
    passwordError,
    onEmailChange,
    onPasswordChange,
    onSubmit,
  }: LoginFormProps) {
    return (
      <main>
        <section>
          <h1>Login</h1>
          <p>Use your test credentials to continue.</p>
  
          <form onSubmit={onSubmit} data-testid="login-form">
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                data-testid="email-input"
                name="email"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
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
                onChange={(event) => onPasswordChange(event.target.value)}
              />
              {passwordError && <p data-testid="password-error">{passwordError}</p>}
            </div>
  
            <button type="submit" data-testid="submit-button">Sign in</button>
          </form>
        </section>
      </main>
    )
  }
  
  export default LoginForm