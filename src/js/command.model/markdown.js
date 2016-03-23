import m from 'mithril'
import marked from 'marked'
import h from 'h.js'

import { resolve } from './util'

marked.setOptions({
  highlight(code, lang) {
    return lang === 'javascript' ? h(code) : code
  },
})

const MARKDOWN_CACHE = {}

export default (name) => (command) => {
  const onSuccess = text => {
    return MARKDOWN_CACHE[name] = {
      command,
      success: true,
      body: m('div.command-result--body-markdown', m.trust(marked(text))),
    }
  }

  const onFailure = error => {
    return {
      command,
      success: false,
      body: m('span.command-result--body-error', 'failure in retriving Markdown text over network'),
    }
  }

  if (MARKDOWN_CACHE[name]) {
    return resolve(Object.assign({ command }, MARKDOWN_CACHE[name]))
  }

  return m.request({
    method: 'GET',
    url   : `markdown/${name}.md`,
    deserialize: text => text,
  }).then(onSuccess, onFailure)
}

