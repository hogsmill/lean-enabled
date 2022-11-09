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

// Users

bus.on('sendCreateUser', (data) => { socket.emit('sendCreateUser', data) })

bus.on('sendUpdateUser', (data) => { socket.emit('sendUpdateUser', data) })

bus.on('sendDeleteUser', (data) => { socket.emit('sendDeleteUser', data) })

bus.on('sendLoadUsers', (data) => { socket.emit('sendLoadUsers', data) })

// Emails

bus.on('sendCreateEmail', (data) => { socket.emit('sendCreateEmail', data) })

bus.on('sendUpdateEmail', (data) => { socket.emit('sendUpdateEmail', data) })

bus.on('sendDeleteEmail', (data) => { socket.emit('sendDeleteEmail', data) })

bus.on('sendLoadEmails', (data) => { socket.emit('sendLoadEmails', data) })

// Courses

bus.on('sendCreateCourseDate', (data) => { socket.emit('sendCreateCourseDate', data) })

bus.on('sendUpdateCourseDate', (data) => { socket.emit('sendUpdateCourseDate', data) })

bus.on('sendDeleteCourseDate', (data) => { socket.emit('sendDeleteCourseDate', data) })

bus.on('sendLoadCourseDates', (data) => { socket.emit('sendLoadCourseDates', data) })

// FAQs

bus.on('sendCreateFaq', (data) => { socket.emit('sendCreateFaq', data) })

bus.on('sendUpdateFaq', (data) => { socket.emit('sendUpdateFaq', data) })

bus.on('sendDeleteFaq', (data) => { socket.emit('sendDeleteFaq', data) })

bus.on('sendLoadFaqs', (data) => { socket.emit('sendLoadFaqs', data) })

// Receive

socket.on('loginSuccess', (data) => { bus.emit('loginSuccess', data) })

socket.on('loginError', (data) => { bus.emit('loginError', data) })

socket.on('logout', (data) => { bus.emit('logout', data) })

socket.on('loadNextCourse', (data) => { bus.emit('loadNextCourse', data) })

// Admin

socket.on('loadUsers', (data) => { bus.emit('loadUsers', data) })

socket.on('loadEmails', (data) => { bus.emit('loadEmails', data) })

socket.on('loadCourseDates', (data) => { bus.emit('loadCourseDates', data) })

socket.on('loadFaqs', (data) => { bus.emit('loadFaqs', data) })

export default bus
