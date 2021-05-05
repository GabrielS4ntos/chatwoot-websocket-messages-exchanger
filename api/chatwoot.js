require('dotenv').config()
const axios = require('axios')
const apiAccessToken = process.env.API_ACCESS_TOKEN
const chatWootUrl = process.env.CHATWOOT_URL
const accountId = process.env.ACCOUNT_ID

const createContact = function (inboxId, userId) {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: `${chatWootUrl}/api/v1/accounts/${accountId}/contacts`,
      headers: {
        api_access_token: apiAccessToken
      },
      data: {
        inbox_id: inboxId,
        contact: {
          name: 'Usuário-' + userId
        }
      }
    }).then((response) => {
      resolve(response.data.payload.contact_inbox.source_id)
    }).catch((err) => console.log('Erro ao criar usuário: ' + err))
  })
}

const createConversation = function (sourceId) {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: `${chatWootUrl}/api/v1/accounts/${accountId}/conversations`,
      headers: {
        api_access_token: apiAccessToken
      },
      data: {
        source_id: sourceId
      }
    }).then((response) => {
      resolve(response.data.id)
    }).catch((err) => console.log('Erro ao criar conversa: ' + err))
  })
}

const toggleConversationStatus = function (conversationId, status) {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: `${chatWootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/toggle_status`,
      headers: {
        api_access_token: apiAccessToken
      },
      data: {
        status: status
      }
    })
  }).catch((err) => console.log('Erro ao alterar status da conversa: ' + err))
}

const sendMessage = function (data, conversationId) {
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: `${chatWootUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`,
      headers: {
        api_access_token: apiAccessToken
      },
      data: {
        content: data.message,
        message_type: 'incoming',
        private: 'false'
      }
    })
  }).catch((err) => console.log('Erro ao enviar mensagem ao Chatwoot: ' + err))
}

module.exports = { createContact, createConversation, toggleConversationStatus, sendMessage }
