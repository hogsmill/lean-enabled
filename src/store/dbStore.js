
const { v4: uuidv4 } = require('uuid')

const passCode = require('./lib/passCode.js')

function _createUser(data) {
  const initial = {
    userName: '',
    passCode: '',
    admin: false,
    siteAdmin: false,
    session: ''
  }
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    initial[keys[i]] = data[keys[i]]
  }
  return initial
}

function _createEmail(data) {
  const initial = {
    email: '',
    name: ''
  }
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    initial[keys[i]] = data[keys[i]]
  }
  return initial
}

function _createCourseDate(data) {
  const initial = {
    id: uuidv4(),
    day: '',
    month: '',
    year: '',
    courseId: ''
  }
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    initial[keys[i]] = data[keys[i]]
  }
  return initial
}

function _createFaq(data) {
  const initial = {
    id: uuidv4(),
    question: '',
    answer: ''
  }
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    initial[keys[i]] = data[keys[i]]
  }
  return initial
}

function _loadUsers(db, io, debugOn) {

  if (debugOn) { console.log('loadUsers') }

  db.usersCollection.find().toArray(function(err, res) {
    if (err) throw err
    let users = []
    if (res.length) {
      users = res
    }
    io.emit('loadUsers', users)
  })
}

function _loadEmails(db, io, debugOn) {

  if (debugOn) { console.log('loadEmails') }

  db.emailsCollection.find().toArray(function(err, res) {
    if (err) throw err
    let emails = []
    if (res.length) {
      emails = res
    }
    io.emit('loadEmails', emails)
  })
}

function _loadCourseDates(db, io, debugOn) {

  if (debugOn) { console.log('loadCourseDates') }

  db.courseDatesCollection.find().toArray(function(err, res) {
    if (err) throw err
    let courses = []
    if (res.length) {
      courses = res
    }
    io.emit('loadCourseDates', courses)
  })
}

function _loadFaqs(db, io, debugOn) {

  if (debugOn) { console.log('loadFaqs') }

  db.faqsCollection.find().toArray(function(err, res) {
    if (err) throw err
    let faqs = []
    if (res.length) {
      faqs = res
    }
    io.emit('loadFaqs', faqs)
  })
}

function _returnLogin(io, data) {
  io.emit('loginSuccess', data)
}

module.exports = {

  createAdminUser: function(db, io, debugOn) {

    if (debugOn) { console.log('createAdminUser') }

    db.usersCollection.findOne({userName: 'admin'}, function(err, res) {
      if (err) throw err
      if (!res) {
        const data = _createUser({
          userName: 'admin',
          passCode: '110960',
          admin: true,
          siteAdmin: true
        })
        db.usersCollection.insertOne(data, function(err, res) {
          if (err) throw err
        })
      }
    })
  },

  createUser: function(db, io, data, debugOn) {

    if (debugOn) { console.log('createUser', data) }

    db.usersCollection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        io.emit('userExists', data)
      } else {
        data = _createUser(data)
        db.usersCollection.insertOne(data, function(err, res) {
          if (err) throw err
          io.emit('userCreated', data)
          _loadUsers(db, io, debugOn)
        })
      }
    })
  },

  updateUser: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateUser', data) }

    db.usersCollection.findOne({userName: data.oldUserName}, function(err, res) {
      if (err) throw err
      if (res) {
        delete data.oldUserName
        data = _createUser(data)
        db.usersCollection.updateOne({'_id': res._id}, {$set: data}, function(err, res) {
          if (err) throw err
          io.emit('userCreated', data)
          _loadUsers(db, io, debugOn)
        })
      }
    })
  },

  deleteUser: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteUser', data) }

    db.usersCollection.deleteOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      _loadUsers(db, io, debugOn)
    })
  },

  loadUsers: function(db, io, data, debugOn) {

    _loadUsers(db, io, debugOn)
  },

  createEmail: function(db, io, data, debugOn) {

    if (debugOn) { console.log('createEmail', data) }

    db.emailsCollection.findOne({email: data.email}, function(err, res) {
      if (err) throw err
      if (res) {
        io.emit('emailExists', data)
      } else {
        data = _createEmail(data)
        db.emailsCollection.insertOne(data, function(err, res) {
          if (err) throw err
          io.emit('emailCreated', data)
          _loadEmails(db, io, debugOn)
        })
      }
    })
  },

  updateEmail: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateEmail', data) }

    db.emailsCollection.findOne({email: data.oldEmail}, function(err, res) {
      if (err) throw err
      if (res) {
        delete data.oldEmail
        data = _createEmail(data)
        db.emailsCollection.updateOne({'_id': res._id}, {$set: data}, function(err, res) {
          if (err) throw err
          io.emit('emailCreated', data)
          _loadEmails(db, io, debugOn)
        })
      }
    })
  },

  deleteEmail: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteEmail', data) }

    db.emailsCollection.deleteOne({email: data.email}, function(err, res) {
      if (err) throw err
      _loadEmails(db, io, debugOn)
    })
  },

  loadEmails: function(db, io, debugOn) {

    _loadEmails(db, io, debugOn)
  },

  createCourseDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('createCourseDate', data) }

    data = _createCourseDate(data)
    db.courseDatesCollection.insertOne(data, function(err, res) {
      if (err) throw err
      io.emit('courseDateCreated', data)
      _loadCourseDates(db, io, debugOn)
    })
  },

  updateCourseDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateCourseDate', data) }

    db.courseDatesCollection.findOne({id: data.id}, function(err, res) {
      if (err) throw err
      if (res) {
        data = _createCourseDate(data)
        db.courseDatesCollection.updateOne({'_id': res._id}, {$set: data}, function(err, res) {
          if (err) throw err
          _loadCourseDates(db, io, debugOn)
        })
      }
    })
  },

  deleteCourseDate: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteCourseDate', data) }

    db.courseDatesCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadCourseDates(db, io, debugOn)
    })
  },

  loadCourseDates: function(db, io, data, debugOn) {

    _loadCourseDates(db, io, debugOn)
  },

  createFaq: function(db, io, data, debugOn) {

    if (debugOn) { console.log('createFaq', data) }

    data = _createFaq(data)
    db.faqsCollection.insertOne(data, function(err, res) {
      if (err) throw err
      io.emit('faqCreated', data)
      _loadFaqs(db, io, debugOn)
    })
  },

  updateFaq: function(db, io, data, debugOn) {

    if (debugOn) { console.log('updateFaq', data) }

    db.faqsCollection.findOne({id: data.id}, function(err, res) {
      if (err) throw err
      if (res) {
        data = _createFaq(data)
        db.faqsCollection.updateOne({'_id': res._id}, {$set: data}, function(err, res) {
          if (err) throw err
          _loadFaqs(db, io, debugOn)
        })
      }
    })
  },

  deleteFaq: function(db, io, data, debugOn) {

    if (debugOn) { console.log('deleteFaq', data) }

    db.faqsCollection.deleteOne({id: data.id}, function(err, res) {
      if (err) throw err
      _loadFaqs(db, io, debugOn)
    })
  },

  loadFaqs: function(db, io, data, debugOn) {

    _loadFaqs(db, io, debugOn)
  },

  login: function(db, io, data, debugOn) {

    if (debugOn) { console.log('login', data) }

    db.usersCollection.findOne({userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        if (res.passCode == data.passCode) {
          db.usersCollection.updateOne({'_id': res._id}, {$set: {session: data.session}}, function(err, ) {
            res.session = data.session
            _returnLogin(io, res)
          })
        } else {
          data.message = 'Incorrect password'
          io.emit('loginError', data)
        }
      } else {
        data.message = 'Unknown user'
        io.emit('loginError', data)
      }
    })
  },

  checkLogin: function(db, io, data, debugOn) {

    if (debugOn) { console.log('checkLogin', data) }

    db.usersCollection.findOne({session: data.session}, function(err, res) {
      if (err) throw err
      if (res) {
        _returnLogin(io, res)
      }
    })
  },

  logout: function(db, io, data, debugOn) {

    if (debugOn) { console.log('logout', data) }

    db.usersCollection.findOne({session: data.session}, function(err, res) {
      if (err) throw err
      if (res) {
        db.usersCollection.updateOne({'_id': res._id}, {$set: {session: ''}}, function(err, res) {
          io.emit('logout', {session: data.session})
        })
      }
    })
  },

  loadNextCourse: function(db, io, data, debugOn) {

    if (debugOn) { console.log('loadNextCourse', data) }

    db.courseDatesCollection.findOne({}, function(err, res) {
      if (err) throw err
      if (res) {
        io.emit('loadNextCourse', res)
      }
    })
  },

}
