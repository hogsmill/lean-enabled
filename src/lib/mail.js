
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
    console.log(data)
    let ok = true
    for (const key in data) {
      console.log(data[key], trim(data[key]))
      data[key] = trim(data[key])
      if (required[key]) {
        if (!data[key] || 0 === data[key].length) {
          ok = false
        }
      }
    }
    console.log(data)
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
