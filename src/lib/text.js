function pageLink(text, linkText) {
  let link = linkText.match(/\[(.*)\]/)
  link = link[1].split('|')
  let tab = ''
  let words = link[0]
  if (link.length == 1) {
    tab = link[0].replace(/\s/g, '-').toLowerCase()
  } else {
    tab = link[0]
    words = link[1]
  }
  text = text.replace(linkText, '<span class="tab-link" tab="' + tab + '">' + words + '</span>')
  return text
}

function urlLink(text, linkText) {
  let link = linkText.match(/\{(.*)\}/)
  link = link[1].split('|')
  const url = link[0]
  let words = url
  if (link.length > 1) {
    words = link[1]
  }
  text = text.replace(linkText, '<a href="' + url + '" target="blank">' + words + '</a>')
  return text
}

function fileLink(text, linkText) {
  let link = linkText.match(/~(.*)~/)
  link = link[1].split('|')
  const file = link[0]
  let words = file
  if (link.length > 1) {
    words = link[1]
  }
  text = text.replace(linkText, '<a href="/docs/blog/' + file + '" target="blank">' + words + '</a>')
  return text
}

// Format:
//    Page: [page|text]
//    URL:  {url|text}
//    File: ~file|text~
//
function replaceLinks(text) {
  let found = true
  while (found) {
    found = false
    const urlText = text.match(/\{[^\}]*\}/)
    if (urlText) {
      found = true
      text = urlLink(text, urlText[0])
    }
    const linkText = text.match(/\[[^\]]*\]/)
    if (linkText) {
      found = true
      text = pageLink(text, linkText[0])
    }
    const fileText = text.match(/~[^~]*~/)
    if (fileText) {
      found = true
      text = fileLink(text, fileText[0])
    }

  }
  return text
}

module.exports = {

  parse: function(text) {
    text = replaceLinks(text)
    return text
  }
}
