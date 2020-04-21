const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const proxy = require('http-proxy-middleware')

app.prepare().then(() => {
  const server = express()

  server.use(
    '/api',
    proxy({
      target: 'http://localhost:4000',
      changeOrigin: true,
      pathRewrite: { [`^/api/`]: '/' },
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})