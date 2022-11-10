
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    modals: {
      contact: false,
    },
    site: 'lean-enabled.co.uk',
    session: null,
    route: '',
    level: '',
    userName: '',
    canLogin: false,
    admin: false,
    siteAdmin: false,
    mobile: false,
    tab: 'transformation',
    users: [],
    emails: [],
    courseDates: [],
    faqs: [],
    courses: [
      {
        id: 1,
        name: 'Improvement Technician',
        logo: 'technician',
        type: 'Standard',
        level: 3,
        leanSixSigma: true,
        belt: 'yellow'
      },
      {
        id: 2,
        name: 'Improvement Practitioner',
        logo: 'practitioner',
        type: 'Standard',
        level: 3,
        leanSixSigma: true,
        belt: 'green'
      },
      {
        id: 3,
        name: 'Improvement Coach (Specialist)',
        logo: 'coach',
        type: 'Standard',
        level: 5,
        leanSixSigma: true,
        belt: 'black'
      },
      {
        id: 4,
        name: 'Improvement Leader',
        logo: 'leader',
        type: 'Standard',
        level: 6,
        leanSixSigma: true,
        belt: 'master-black'
      }
    ],
    people: [
      {
        name: 'Anil Matthew',
        role: 'Chief Exec Officer',
        pic: 'anil-pic',
        text: [
          'Professional, Chartered Engineer',
          'Lean Six-Sigma Master Black Belt, programmes with 100 companies globally. With over 25 years Lean experience in FMCG, Pharmaceutical, Consumer Healthcare Industries driving Change, structured Problem Solving & Engineering solutions inc. the business improvement turnaround of "failing" NHS Trust (CQC Rating – GOOD)',
          'Managed Global Improvement Teams that Coached, Mentored & delivered Supply chain Improvements to Service, Delivery, Cost (in excess of £50M)'
        ],
        endorsements: 'anil-endorsements'
      },
      {
        name: 'Nick Chambers',
        role: 'Chief Operating Officer',
        pic: 'nick-pic',
        text: [
          'With over 15 years Lean transformation experience in FMCG, Pharmaceutical and Healthcare industry, Nick has implemented significant programmes in driving change, structured problem solving & organisational strategy.',
          'Managed whole organisation improvement Initiatives including coaching, mentored & delivery of lean management systems across entire NHS trusts.',
          'Proven track record of developing and implementing a fully engaging culture change that links executive boards to front line workforce and creates a successful improvement culture. Winner of HSJ Patient Safety Awards 2018 for Education & Training'
        ],
        endorsements: 'nick-endorsements'
      }
    ],
    currentCourse: {},
    currentCourseDate: {}
  },
  getters: {
    getSite: (state) => {
      return state.site
    },
    getEmailAddresses: (state) => {
      const emails = []
      for (let i = 0; i < state.emails.length; i++) {
        emails.push(state.emails[i].email)
      }
      return emails
    },
    getAdmin: (state) => {
      return state.admin
    },
    getSiteAdmin: (state) => {
      return state.siteAdmin
    },
    getCanLogin: (state) => {
      return state.canLogin
    },
    getSession: (state) => {
      return state.session
    },
    getUserName: (state) => {
      return state.userName
    },
    getMobile: (state) => {
      return state.mobile
    },
    getTab: (state) => {
      return state.tab
    },
    getModals: (state) => {
      return state.modals
    },
    getUsers: (state) => {
      return state.users
    },
    getEmails: (state) => {
      return state.emails
    },
    getCourseDates: (state) => {
      return state.courseDates
    },
    getFaqs: (state) => {
      return state.faqs
    },
    getCourses: (state) => {
      return state.courses
    },
    getPeople: (state) => {
      return state.people
    },
    getCurrentCourse: (state) => {
      return state.currentCourse
    },
    getCurrentCourseDate: (state) => {
      return state.currentCourseDate
    }
  },
  mutations: {
    updateCanLogin: (state, payload) => {
      state.canLogin = payload
    },
    updateSession: (state, payload) => {
      state.session = payload
    },
    updateLogin: (state, payload) => {
      state.session = payload.session
      state.userName = payload.userName
      state.admin = payload.admin
      state.siteAdmin = payload.siteAdmin
    },
    updateMobile: (state, payload) => {
      state.mobile = payload
    },
    updateTab: (state, payload) => {
      state.tab = payload
    },
    showModal: (state, payload) => {
      const modals = Object.keys(state.modals)
      for (let i = 0; i < modals.length; i++) {
        state.modals[modals[i]] = false
      }
      state.modals[payload] = true
    },
    hideModal: (state, payload) => {
      state.modals[payload] = false
    },
    updateUsers: (state, payload) => {
      state.users = payload
    },
    updateEmails: (state, payload) => {
      state.emails = payload
    },
    updateCourseDates: (state, payload) => {
      state.courseDates = payload
    },
    updateFaqs: (state, payload) => {
      state.faqs = payload
    },
    updateCurrentCourse: (state, payload) => {
      state.currentCourse = payload
    },
    updateCurrentCourseDate: (state, payload) => {
      state.currentCourseDate = payload
    }
  },
  actions: {
    updateCanLogin: ({ commit }, payload) => {
      commit('updateCanLogin', payload)
    },
    updateSession: ({ commit }, payload) => {
      commit('updateSession', payload)
    },
    updateLogin: ({ commit }, payload) => {
      commit('updateLogin', payload)
    },
    updateMobile: ({ commit }, payload) => {
      commit('updateMobile', payload)
    },
    updateTab: ({ commit }, payload) => {
      commit('updateTab', payload)
    },
    showModal: ({ commit }, payload) => {
      commit('showModal', payload)
    },
    hideModal: ({ commit }, payload) => {
      commit('hideModal', payload)
    },
    updateUsers: ({ commit }, payload) => {
      commit('updateUsers', payload)
    },
    updateEmails: ({ commit }, payload) => {
      commit('updateEmails', payload)
    },
    updateCourseDates: ({ commit }, payload) => {
      commit('updateCourseDates', payload)
    },
    updateFaqs: ({ commit }, payload) => {
      commit('updateFaqs', payload)
    },
    updateCurrentCourse: ({ commit }, payload) => {
      commit('updateCurrentCourse', payload)
    },
    updateCurrentCourseDate: ({ commit }, payload) => {
      commit('updateCurrentCourseDate', payload)
    }
  }
})
