
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    modals: {
      contact: false,
    },
    emails: {
      to: [
        'info@hogsmill.com',
        'cheyne_hill@yahoo.co.uk'
      ]
    },
    site: 'lean-enabled.co.uk',
    id: '',
    session: null,
    route: '',
    level: '',
    userName: '',
    admin: false,
    mobile: false,
    tab: 'leaders',
    pricings: [],
    games: [],
    labGames: [],
    rss: {
      scope: '',
      id: ''
    },
    gameDates: [],
    updates: [],
    faqs: []
  },
  getters: {
    getSite: (state) => {
      return state.site
    },
    getEmails: (state) => {
      return state.emails
    },
    getId: (state) => {
      return state.id
    },
    getSession: (state) => {
      return state.session
    },
    getRoute: (state) => {
      return state.route
    },
    getUserName: (state) => {
      return state.userName
    },
    getAdmin: (state) => {
      return state.admin
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
    getUpdates: (state) => {
      return state.updates
    },
    getFaqs: (state) => {
      return state.faqs
    },
    getPricings: (state) => {
      return state.pricings
    },
    getRss: (state) => {
      return state.rss
    }
  },
  mutations: {
    updateId: (state, payload) => {
      state.id = payload
    },
    updateLogin: (state, payload) => {
      state.session = payload.session
      state.route = payload.route
      state.level = payload.level
      state.loggedInGames = payload.games
      state.userName = payload.userName
      state.admin = payload.loggedInAsAdmin
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
    updateUpdates: (state, payload) => {
      state.updates = payload
    },
    updateFaqs: (state, payload) => {
      state.faqs = payload
    },
    setRss: (state, payload) => {
      state.rss = {
        scope: payload.scope,
        id: payload.id
      }
    }
  },
  actions: {
    updateId: ({ commit }, payload) => {
      commit('updateId', payload)
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
    updateUpdates: ({ commit }, payload) => {
      commit('updateUpdates', payload)
    },
    updateFaqs: ({ commit }, payload) => {
      commit('updateFaqs', payload)
    },
    updatePricings: ({ commit }, payload) => {
      commit('updatePricings', payload)
    },
    setRss: ({ commit }, payload) => {
      commit('setRss', payload)
    }
  }
})
