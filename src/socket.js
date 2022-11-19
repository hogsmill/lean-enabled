import io from 'socket.io-client'
import bus from './EventBus'

let connStr
if (location.hostname == 'localhost') {
  connStr = 'http://localhost:4850'
} else {
  connStr = 'https://agilesimulations.co.uk:4850'
}

console.log('Connecting to: ' + connStr)
const socket = io(connStr)

// Send

// Contact

bus.on('contact', () => { bus.emit('showContact') })

bus.on('sendLoadNextCourse', () => { socket.emit('sendLoadNextCourse') })

// --------------------------------------------------------------
// Admin

bus.on('sendCreateAdminUser', (data) => { socket.emit('sendCreateAdminUser', data) })

bus.on('sendLogin', (data) => { socket.emit('sendLogin', data) })

bus.on('sendCheckLogin', (data) => { socket.emit('sendCheckLogin', data) })

bus.on('sendLogout', (data) => { socket.emit('sendLogout', data) })

bus.on('sendCreate', (data) => { socket.emit('sendCreate', data) })

bus.on('sendUpdate', (data) => { socket.emit('sendUpdate', data) })

bus.on('sendDelete', (data) => { socket.emit('sendDelete', data) })

bus.on('sendLoad', (type) => { socket.emit('sendLoad', type) })

// Receive

socket.on('loginSuccess', (data) => { bus.emit('loginSuccess', data) })

socket.on('loginError', (data) => { bus.emit('loginError', data) })

socket.on('logout', (data) => { bus.emit('logout', data) })

socket.on('loadNextCourse', (data) => { bus.emit('loadNextCourse', data) })

// Admin

socket.on('load', (data) => { bus.emit('load', data) })

export default bus
