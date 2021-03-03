const bodyParser = require('body-parser')
const express = require('express')

const app = express()

let emergencyContent = {
  status: false,
  title: '',
  body: ''
}

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

app.get('/*', function(request, response, next) {
  response.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  })
  next()
})

app.post('/update', function(request, response) {
  if (
    typeof request.query.key === 'undefined' ||
    request.query.key !== process.env.EMERGENCY_UPDATE_TOKEN
  ) {
    response.send({ success: 0 })
    return
  }
  emergencyContent = request.body
  emergencyContent.status =
    emergencyContent.title.toLowerCase().trim() != 'all clear'
  response.send({ success: 1 })
})

app.get('/emergency.json', function(request, response) {
  response.send(emergencyContent)
})

app.get('/test.json', function(request, response) {
  response.send(
    JSON.stringify({
      status: true,
      title: 'Emergency test',
      body: 'This is a test of the emergency popup'
    })
  )
})

module.exports = app
