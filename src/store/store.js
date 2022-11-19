
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    modals: {
      contact: false,
      'contact-person': false,
      login: false
    },
    site: 'lean-enabled.co.uk',
    session: null,
    path: [],
    userName: '',
    canLogin: false,
    admin: false,
    siteAdmin: false,
    mobile: false,
    tab: 'transformation',
    userType: 'manager',
    users: [],
    emails: [],
    courseDates: [],
    faqs: [],
    services: [],
    courses: [],
    people: [],
    currentCourse: {},
    currentCourseDate: {},
    currentPerson: {},
    expanded: '',
    content: {
      mission: '',
      consultancy: '',
      training: '',
      services: '',
      caseStudy: ''
    }
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
    getUserType: (state) => {
      return state.userType
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
      return state.courseDates.sort((a, b) => {
        a = new Date(a.year, a.month - 1, a.day)
        b = new Date(b.year, b.month - 1, b.day)
        return a - b
      })
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
    getServices: (state) => {
      return state.services
    },
    getCurrentCourse: (state) => {
      return state.currentCourse
    },
    getCurrentCourseDate: (state) => {
      return state.currentCourseDate
    },
    getCurrentPerson: (state) => {
      return state.currentPerson
    },
    getExpanded: (state) => {
      return state.expanded
    },
    getContentMission: (state) => {
      return state.content.mission
    },
    getContentConsultancy: (state) => {
      return state.content.consultancy
    },
    getContentTraining: (state) => {
      return state.content.training
    },
    getContentServices: (state) => {
      return state.content.services
    },
    getContentCaseStudy: (state) => {
      return state.content.caseStudy
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
      state.path.push(payload)
      state.tab = payload
    },
    updateUserType: (state, payload) => {
      state.userType = payload
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
    updateMission: (state, payload) => {
      state.montent.mission = payload
    },
    updateCourses: (state, payload) => {
      state.courses = payload
    },
    updateCourseDates: (state, payload) => {
      state.courseDates = payload
    },
    updateFaqs: (state, payload) => {
      state.faqs = payload
    },
    updatePeople: (state, payload) => {
      state.people = payload
    },
    updateServices: (state, payload) => {
      state.services = payload
    },
    updateCurrentCourse: (state, payload) => {
      state.currentCourse = payload
    },
    updateCurrentCourseDate: (state, payload) => {
      state.currentCourseDate = payload
    },
    updateCurrentPerson: (state, payload) => {
      state.currentPerson = payload
    },
    updateExpanded: (state, payload) => {
      state.expanded = payload
    },
    updateContent: (state, payload) => {
      state.content[payload.type] = payload.content
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
    updateUserType: ({ commit }, payload) => {
      commit('updateUserType', payload)
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
    updateMission: ({ commit }, payload) => {
      commit('updateMission', payload)
    },
    updateCourses: ({ commit }, payload) => {
      commit('updateCourses', payload)
    },
    updateServices: ({ commit }, payload) => {
      commit('updateServices', payload)
    },
    updateCourseDates: ({ commit }, payload) => {
      commit('updateCourseDates', payload)
    },
    updateFaqs: ({ commit }, payload) => {
      commit('updateFaqs', payload)
    },
    updatePeople: ({ commit }, payload) => {
      commit('updatePeople', payload)
    },
    updateCurrentCourse: ({ commit }, payload) => {
      commit('updateCurrentCourse', payload)
    },
    updateCurrentCourseDate: ({ commit }, payload) => {
      commit('updateCurrentCourseDate', payload)
    },
    updateCurrentPerson: ({ commit }, payload) => {
      commit('updateCurrentPerson', payload)
    },
    updateExpanded: ({ commit }, payload) => {
      commit('updateExpanded', payload)
    },
    updateContent: ({ commit }, payload) => {
      commit('updateContent', payload)
    }
  }
})
