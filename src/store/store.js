
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
    courses: [
      {
        name: 'Improvement Technician',
        logo: 'technician',
        type: 'Standard',
        level: 3,
        leanSixSigma: true,
        belt: 'yellow'
      },
      {
        name: 'Improvement Practitioner',
        logo: 'practitioner',
        type: 'Standard',
        level: 3,
        leanSixSigma: true,
        belt: 'green'
      },
      {
        name: 'Improvement Coach (Specialist)',
        logo: 'coach',
        type: 'Standard',
        level: 5,
        leanSixSigma: true,
        belt: 'black'
      },
      {
        name: 'Improvement Leader',
        logo: 'leader',
        type: 'Standard',
        level: 6,
        leanSixSigma: true,
        belt: 'master-black'
      }
    ]
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
      return state.courses
    },
    getCourses: (state) => {
      return state.courses
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
      commit('updateCourses', payload)
    }
  }
})
