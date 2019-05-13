import express from "express"
import bodyParser from "body-parser"
import router from './routes/v1'

let server = express()
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use('/api/v1/', router)

let port = process.env.BREAKOUT_SERVER_PORT || 8080

server.listen(port)
console.log(`Listening on port ${port}`)
