type DashboardProps = {
    onLogout: () => void
  }
  
  function Dashboard({ onLogout }: DashboardProps) {
    return (
      <main>
        <section>
          <h1>Dashboard</h1>
          <p>Welcome back</p>
          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </section>
      </main>
    )
  }
  
  export default Dashboard