
let called = false

function init(store) {

  document.addEventListener('keydown', function(event) {
    const key = event.key
    if (key === 'Backspace' || key === 'Delete') {
        store.dispatch('back')
    }
  })

  window.addEventListener('popstate', () => {
    if (!called) {
      called = true
      store.dispatch('back')
    } else {
      called = false
    }
  })
}

const Router = {

  init: function(store) {
    init(store)
  }
}

export default Router
