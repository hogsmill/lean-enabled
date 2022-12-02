
const months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

function dayNum(n) {
  return n < 10 ? '0' + n : n
}

function dayText(n) {
  const str = ''
  switch(n) {
    case 1:
    case 21:
    case 31:
      str = n + 'st'
      break
    case 2:
    case 22:
      str = n + 'nd'
      break
    case 3:
    case 23:
      str = n + 'rd'
      break
    default:
      str = n + 'th'
      break
    }
}

function shortMonth(n) {
  return months[n].substring(0, 3)
}

const DateFuns = {

  getDate(d, m, y) {
    return dayNum(d) + '-' + shortMonth(m) + '-' + y
  }
}

export default DateFuns
