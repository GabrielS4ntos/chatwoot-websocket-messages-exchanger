require('dotenv').config()
const express = require('express')
const cors = require('cors')
const socketIo = require('socket.io')
const http = require('http')
const chatwoot = require('./api/chatwoot.js')

const port = process.env.PORT || 8081
const inboxId = process.env.INBOX_ID
const clientEndpoint = process.env.CLIENT_ENDPOINT_URL

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: clientEndpoint,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log((new Date()) + ': Nova instância do client conectou-se. (id: ' + socket.id + ')')
  const userId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

  socket.on('client-message', body => {
    if (body.conversation_id === '') {
      chatwoot.createContact(inboxId, userId).then((sourceId) => {
        chatwoot.createConversation(sourceId).then((conversationId) => {
          socket.emit('conversation_id', conversationId)
          chatwoot.sendMessage(body, conversationId)
        })
      })
    } else {
      chatwoot.sendMessage(body, body.conversation_id)
    }
  })

  socket.on('disconnect', () => {
    // chatwoot.toggleConversationStatus(conversationId, "resolved");
    console.log((new Date()) + ':Instância do Client desconectou-se. (Socket: ' + socket.id + ')')
  })
})

app.get('/', (_, res) => {
  res.send({ title: 'Chatwoot Webservice', status: '202' })
})

app.post('/api/v1/chatwoot/messages', (req, res) => {
  if (req.body.message_type === 'outgoing') {
    io.emit('server-message', {
      data: {
        message: req.body.content,
        responseType: 'text'
      }
    })
  }
  res.send({ title: 'Mensagem recebida pelo WebService', status: '202' })
})

server.listen(port, () => console.log(`Escutando na porta ${port}`))
