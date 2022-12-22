
function _setTab(store, tab) {
  if (store.getters.getMobile) {
    store.dispatch('updateMenuHidden', true)
  }
  store.dispatch('updateTab', tab)
}

const DomFuns = {

  root: function() {
    return location.hostname == 'agilesimulations.co.uk' ? '/lean-enabled' : ''
  },

  addLinkEvents: function(store) {
    let links = document.getElementsByClassName('tab-link')
    for (let i = 0; i < links.length; i++) {
      const tab = links[i].getAttribute('tab')
      links[i].addEventListener('click', () => {
        _setTab(store, tab)
      })
    }
    links = document.getElementsByClassName('contact-link')
    for (let i = 0; i < links.length; i++) {
      const tab = links[i].getAttribute('tab')
      links[i].addEventListener('click', () => {
        store.dispatch('showModal', 'contact')
      })
    }
  },

  setTab: function(store, tab) {
    _setTab(store, tab)
  }
}

export default DomFuns
