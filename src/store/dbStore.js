
const { v4: uuidv4 } = require('uuid')

const fs = require('fs')

const passCode = require('./lib/passCode.js')
const defaults = require('./defaults.js')

const _objects = {
  user: {
    userName: '',
    passCode: '',
    admin: false,
    siteAdmin: false,
    enabled: false
  },
  session: {
    userId: '',
    session: ''
  },
  mission: {
    text: ''
  },
  carousel: {
    name: '',
    slides: []
  },
  value: {
    title: 'Trust',
    text: [],
    points: []
  },
  quote: {
    author: '',
    quote: ''
  },
  transformation: {
    text: ''
  },
  service: {
    title: '',
    description: '',
    enabled: false
  },
  technique: {
    title: '',
    description: '',
    enabled: false
  },
  email: {
    email: '',
    name: '',
    enabled: false
  },
  course: {
    name: '',
    logo: '',
    courseType: '',
    level: '',
    leanSixSigma: '',
    belt: '',
    video: false,
    modules: [],
    enabled: false
  },
  courseComment: {
    level: '',
    comments: []
  },
  courseDate: {
    day: '',
    month: '',
    year: '',
    courseId: '',
    enabled: false
  },
  faq: {
    question: '',
    answer: '',
    enabled: false
  },
  blog: {
    day: '',
    month: '',
    year: '',
    title: '',
    text: [],
    image: '',
    enabled: false
  },
  comment: {
    author: '',
    comment: '',
    scope: '',
    enabled: false
  },
  person: {
    name: '',
    role: '',
    email: '',
    pic: '',
    endorsements: '',
    enabled: false
  },
  safeguarding: {
    name: '',
    pic: '',
    role: '',
    email: '',
    phone: ''
  },
  contentProblemSolving: {
    header: '',
    intro: '',
    bullets: []
  },
  contentBenefits: {
    header: '',
    intro: '',
    bullets: []
  },
  contentFactors: {
    header: '',
    intro: '',
    bullets: []
  },
  contentWhy: {
    header: '',
    intro: '',
    bullets: []
  },
  contentReasons: {
    header: '',
    intro: '',
    bullets: []
  },
  contentConsultancy: {
    text: []
  },
  contentTraining: {
    text: []
  },
  contentServices: {
    text: []
  },
  contentApprenticesIntro: {
    manager: {
      text: []
    },
    apprentice: {
      text: []
    },
  },
  contentServicesIntro: {
    manager: {
      text: []
    },
    apprentice: {
      text: []
    },
  },
  contentCoursesIntro: {
    manager: {
      text: []
    },
    apprentice: {
      text: []
    },
  },
  caseStudy: {
    header: '',
    text: []
  },
  howItWorks: {
    image: '',
    header: '',
    text: []
  }
}

function _create(data) {
  const initial = JSON.parse(JSON.stringify(_objects[data.type]))
  initial.id = uuidv4()
  const keys = Object.keys(data)
  for (let i = 0; i < keys.length; i++) {
    initial[keys[i]] = data[keys[i]]
  }
  return initial
}

function _loadDefaults(db, io, type, debugOn) {

  if (debugOn) { console.log('creating defaults for', type) }

  const objs = defaults.get(type)
  if (objs) {
    let objArray = []
    for (let i = 0; i < objs.length; i++) {
      let obj = objs[i]
      obj.type = type
      const fullObj = _create(obj)
      objArray.push(fullObj)
    }
    db.collection.insertMany(objArray, function(err, res) {
      if (err) throw err
      io.emit('ObjectCreated', objArray)
      _load(db, io, type, debugOn)
    })
  }
}

function _load(db, io, type, debugOn) {

  if (debugOn) { console.log('load', type) }

  db.collection.find({type: type}).toArray(function(err, res) {
    if (err) throw err
    let objects = []
    if (res.length) {
      objects = res
    }
    if (objects.length == 0) {
      _loadDefaults(db, io, type, debugOn)
    } else {
      io.emit('load', {type: type, objects: objects})
    }
  })
}

function _returnLogin(io, data) {
  io.emit('loginSuccess', data)
}

module.exports = {


  load: function(db, io, type, debugOn) {

    _load(db, io, type, debugOn)
  },

  create: function(db, io, data, debugOn) {

    if (debugOn) { console.log('create', data) }

    data = _create(data)
    db.collection.insertOne(data, function(err, res) {
      if (err) throw err
      io.emit('ObjectCreated', data)
      _load(db, io, data.type, debugOn)
    })
  },

  update: function(db, io, data, debugOn) {

    if (debugOn) { console.log('update', data) }

    db.collection.findOne({type: data.type, id: data.id}, function(err, res) {
      if (err) throw err
      if (res) {
        data = _create(data)
        db.collection.updateOne({'_id': res._id}, {$set: data}, function(err, res) {
          if (err) throw err
          io.emit('objectCreated', data)
          _load(db, io, data.type, debugOn)
        })
      }
    })
  },

  delete: function(db, io, data, debugOn) {

    if (debugOn) { console.log('delete', data) }

    db.collection.deleteOne({type: data.type, id: data.id}, function(err, res) {
      if (err) throw err
      _load(db, io, data.type, debugOn)
    })
  },

  uploadFile: function(db, io, data, debugOn) {

    if (debugOn) { console.log('uploadFile', data) }

    const fileDirs = {
      'image': 'img',
      'file': 'docs'
    }

    const file = __dirname + '/../assets/' + fileDirs[data.fileType] + '/' + data.type + '/' + data.name
    fs.writeFile(file, data.content, err => {
      if (err) {
        console.error(err);
      } else {
        delete data.content
        io.emit('fileUploaded', data)
      }
    })
  },

  createAdminUser: function(db, io, debugOn) {

    if (debugOn) { console.log('createAdminUser') }

    db.collection.findOne({type: 'user', userName: 'admin'}, function(err, res) {
      if (err) throw err
      if (!res) {
        const user = _create({
          type: 'user',
          userName: 'admin',
          passCode: '110960',
          admin: true,
          siteAdmin: true
        })
        db.collection.insertOne(user, function(err, ) {
          if (err) throw err
        })
      }
    })
  },

  login: function(db, io, data, debugOn) {

    if (debugOn) { console.log('login', data) }

    db.collection.findOne({type: 'user', userName: data.userName}, function(err, res) {
      if (err) throw err
      if (res) {
        if (res.passCode == data.passCode) {
          const session = _create({
            type: 'session',
            userId: res.id,
            session: data.session
          })
          db.collection.insertOne(session, function(err, ) {})
          db.collection.findOne({type: 'user', id: session.userId}, function(err, user) {
            session.userName = user.userName
            session.admin = user.admin
            session.siteAdmin = user.siteAdmin
            _returnLogin(io, session)
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

    db.collection.findOne({session: data.session}, function(err, res) {
      if (err) throw err
      if (res) {
        db.collection.findOne({type: 'user', id: res.userId}, function(err, user) {
          delete user._id
          delete user.passCode
          user.session = data.session
          _returnLogin(io, user)
        })
      }
    })
  },

  logout: function(db, io, data, debugOn) {

    if (debugOn) { console.log('logout', data) }

    db.collection.findOne({session: data.session}, function(err, res) {
      if (err) throw err
      if (res) {
        db.collection.deleteOne({session: data.session}, function(err, res) {
          io.emit('logout', {session: data.session})
        })
      }
    })
  },

  loadNextCourse: function(db, io, data, debugOn) {

    if (debugOn) { console.log('loadNextCourse', data) }

    db.collection.find({type: 'courseDate'}).toArray(function(err, res) {
      if (err) throw err
      if (res) {
        res = res.sort((a, b) => {
          a = new Date(a.year, a.month - 1, a.day)
          b = new Date(b.year, b.month - 1, b.day)
          return a - b
        })
        let now = new Date()
        let course = {}
        let found = false
        for (let i = 0; i < res.length; i++) {
          const d = new Date(res[i].year, res[i].month - 1, res[i].day)
          if (!found && now - d <= 0) {
            course = res[i]
            found = true
          }
        }
        io.emit('loadNextCourse', course)
      }
    })
  },

}
