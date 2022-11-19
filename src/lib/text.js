
function link(text) {
  let tab = text.replace(/\s/g, '-').toLowerCase()
  tab = tab.slice(1, -1)
  text = text.replace(/\[/, '<span class="tab-link" tab="' + tab + '">')
  text = text.replace(/\]/, '</span>')
  return text
}

function replaceLinks(text) {
  //while (text.match(/\[/)) {
    const linkText = text.match(/(\[[A-Za-z\s]*\])/)
    if (linkText) {
      text = text.replace(linkText[1], link(linkText[1]))
    }
  //}
  return text
}
module.exports = {

  parse: function(text) {
    text = replaceLinks(text)
    return text
  }
}
