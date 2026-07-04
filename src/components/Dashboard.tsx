import { useState } from 'react'

type DashboardProps = {
    onLogout: () => void
}

function Dashboard({ onLogout }: DashboardProps) {
    const [count, setCount] = useState(0)

    return (
        <main>
            <section>
                <h1>Dashboard</h1>
                <p>Welcome back</p>

                <div>
                    <p data-testid="counter-value">{count}</p>
                    <button type="button" data-testid="increment-button" onClick={() => setCount(c => c + 1)}>
                        Increment
                    </button>
                    <button type="button" data-testid="reset-button" onClick={() => setCount(0)}>
                        Reset
                    </button>
                </div>

                <button type="button" onClick={onLogout}>
                    Logout
                </button>
            </section>
        </main>
    )
}

export default Dashboard
