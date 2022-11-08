
import jQuery from 'jquery'
const $ = jQuery
window.$ = $

const required = {
  email: true
}

function trim(data) {
  let ret = ''
  if (typeof(data) == 'string') {
    ret = data.trim
  } else {
    const arr = []
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i].trim())
    }
    ret = arr.join(', ')
  }
  return ret
}

const Mail = {

  post: function(data, message) {
    let ok = true
    for (const key in data) {
      data[key] = trim(data[key])
      console.log(data)
      if (required[key]) {
        if (!data[key] || 0 === data[key].length) {
          ok = false
        }
      }
    }
    if (!ok) {
      alert('Please complete all fields')
      return false
    } else {
      $.ajax({
          type: 'GET',
          url: 'https://agilesimulations.co.uk/mail.php',
          data: data,
          success: () => {
            alert(message)
          }
      })
      return true
    }
  }
}

export default Mail
