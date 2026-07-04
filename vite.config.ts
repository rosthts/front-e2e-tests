import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mock-api',
      configureServer(server) {
        server.middlewares.use('/api/login', (req, res) => {
          const chunks: Buffer[] = []
          req.on('data', (chunk: Buffer) => chunks.push(chunk))
          req.on('end', () => {
            setTimeout(() => {
              try {
                const { email, password } = JSON.parse(Buffer.concat(chunks).toString())
                res.setHeader('Content-Type', 'application/json')
                if (email === 'test@example.com' && password === 'password') {
                  res.statusCode = 200
                  res.end(JSON.stringify({ success: true }))
                } else {
                  res.statusCode = 401
                  res.end(JSON.stringify({ error: 'Invalid email or password' }))
                }
              } catch {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Bad request' }))
              }
            }, 500)
          })
        })
      },
    },
  ],
})
