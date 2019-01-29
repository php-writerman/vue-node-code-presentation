import './app/tools/loadEnv'
import '../register-aliases'
import './postInstall'

import http from 'http'
import app from './server'
import models from './app/models'

const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

models.sequelize.sync().then(() => {
  server.listen(port)
  server.on('listening', onListening)
})

const onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Listening on ' + bind)
}
