
import { v4 as uuidv4 } from 'uuid'

const LocalStorage = {

  check: function() {
    let check
    const item = 'lean-enabled-test'
    const uuid = uuidv4()
    try {
      localStorage.setItem(item, uuid)
      if (localStorage.getItem(item) == uuid) {
        check = 'ok'
      }
      localStorage.removeItem(item)
    }
    catch(e) {
      check = e
    }
    return check
  },

  clear: function(suffix) {
    const expr = new RegExp('-' + suffix + '$')
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).match(expr)) {
        console.log('deleting', localStorage.key(i))
        localStorage.removeItem(localStorage.key(i))
      }
    }
  }

}

export default LocalStorage
