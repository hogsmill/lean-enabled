const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const fs = require('fs')
const ON_DEATH = require('death')({uncaughtException: true})
const os = require('os')
const prod = os.hostname() == 'agilesimulations' ? true : false

const port = 4850
const logFile = prod ? process.argv[4] : 'server.log'

const collection = 'leanEnabled'

//const usersCollection = 'leanEnabledUsers'
//const servicesCollection = 'leanEnabledServicess'
//const emailsCollection = 'leanEnabledEmails'
//const courseDatesCollection = 'leanEnabledCourseDates'
//const faqsCollection = 'leanEnabledFaqs'
//const contentCollection = 'leanEnabledContent'

ON_DEATH(function(signal, err) {
  let logStr = new Date()
  if (signal) {
    logStr = logStr + ' ' + signal + '\n'
  }
  if (err && err.stack) {
    logStr = logStr + '  Error: ' + err.stack + '\n'
  }
  fs.appendFile(logFile, logStr, function (err) {
    if (err) console.log(logStr)
    process.exit()
  })
})

global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

let httpServer
let io
if (!prod) {
  const express = require('express')
  const app = express()
  httpServer = require('http').createServer(app)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['http://localhost:*'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
} else {
  const options = {
    key: fs.readFileSync('/etc/ssl/private/agilesimulations.co.uk.key'),
    cert: fs.readFileSync('/etc/ssl/certs/agilesimulations.cer')
  }
  httpServer = require('https').createServer(options)
  io = require('socket.io')(httpServer, {
    cors: {
      origins: ['https://agilesimulations.co.uk'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  })
}

const rss = require('./store/rss.js')
const sitemap = require('./store/sitemap.js')
const dbStore = require('./store/dbStore.js')

const MongoClient = require('mongodb').MongoClient

const url = prod ?  'mongodb://127.0.0.1:27017/' : 'mongodb://localhost:27017/'
const maxIdleTime = 7200000
const connectDebugOff = prod
const debugOn = !prod

const connections = {}
const maxConnections = 2000

function emit(event, data) {
  if (debugOn) {
    console.log(event, data, '(emit)')
  }
  io.emit(event, data)
}

MongoClient.connect(url, { useUnifiedTopology: true, maxIdleTimeMS: maxIdleTime }, function (err, client) {
  if (err) throw err
  const db = client.db('db')

  db.createCollection(collection, function(error, collection) {})
  //db.createCollection(usersCollection, function(error, usersCollection) {})
  //db.createCollection(servicesCollection, function(error, servicesCollection) {})
  //db.createCollection(emailsCollection, function(error, emailsCollection) {})
  //db.createCollection(courseDatesCollection, function(error, courseDatesCollection) {})
  //db.createCollection(faqsCollection, function(error, faqsCollection) {})
  //db.createCollection(contentCollection, function(error, contentCollection) {})

  db.collection = db.collection(collection)
  //db.usersCollection = db.collection(usersCollection)
  //db.servicesCollection = db.collection(servicesCollection)
  //db.emailsCollection = db.collection(emailsCollection)
  //db.courseDatesCollection = db.collection(courseDatesCollection)
  //db.faqsCollection = db.collection(faqsCollection)
  //db.contentCollection = db.collection(contentCollection)

  sitemap.createSiteMap(db, debugOn)

  io.on('connection', (socket) => {
    const connection = socket.handshake.headers.host
    connections[connection] = connections[connection] ? connections[connection] + 1 : 1
    if (Object.keys(connections).length > maxConnections || connections[connection] > maxConnections) {
      console.log(`Too many connections. Socket ${socket.id} closed`)
      socket.disconnect(0)
    } else {
      connectDebugOff || console.log(`A user connected with socket id ${socket.id} from ${connection} - ${connections[connection]} connections. (${Object.keys(connections).length} clients)`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    }

    socket.on('disconnect', () => {
      const connection = socket.handshake.headers.host
      connections[connection] = connections[connection] - 1
      connectDebugOff || console.log(`User with socket id ${socket.id} has disconnected.`)
      emit('updateConnections', {connections: connections, maxConnections: maxConnections})
    })

    socket.on('sendLogin', (data) => { dbStore.login(db, io, data, debugOn) })

    socket.on('sendCheckLogin', (data) => { dbStore.checkLogin(db, io, data, debugOn) })

    socket.on('sendLogout', (data) => { dbStore.logout(db, io, data, debugOn) })

    socket.on('sendLoadNextCourse', () => { dbStore.loadNextCourse(db, io, debugOn) })

    // Admin

    socket.on('sendCreateAdminUser', () => { dbStore.createAdminUser(db, io, debugOn) })

    socket.on('sendCreate', (data) => { dbStore.create(db, io, data, debugOn) })

    socket.on('sendUpdate', (data) => { dbStore.update(db, io, data, debugOn) })

    socket.on('sendDelete', (data) => { dbStore.delete(db, io, data, debugOn) })

    socket.on('sendLoad', (type) => { dbStore.load(db, io, type, debugOn) })

  })
})

httpServer.listen(port, () => {
  console.log('Listening on *:' + port)
})
