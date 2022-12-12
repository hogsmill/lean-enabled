
function init(store) {

  document.addEventListener('keydown', function(event) {
    const key = event.key
    if (key === 'Backspace' || key === 'Delete') {
        store.dispatch('back')
    }
  })

  document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true
  }

  document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false
  }

  window.onhashchange = function() {
    if (window.innerDocClick) {
        //Your own in-page mechanism triggered the hash change
    } else {
      alert('here')
        //Browser back button was clicked
    }
  }
}

const Router = {

  init: function(store) {
    init(store)
  }
}

export default Router
