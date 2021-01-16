const express = require('express')
const app = express()
const port = 3000 || process.env.PORT


//Log confing00
var morgan = require('morgan')
app.use(morgan('HTTP_VERSION(:http-version) :method :url STATUS(:status) REMOTE_ADDR(:remote-addr) RESPONSE_TIME(:response-time[4]) TOTOAL_TIME(:total-time[4])'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Versioner_Auth_Service listening PORT:${port}`)
})