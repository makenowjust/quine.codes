import m from 'mithril'

import { resolve } from './util'

export default (url) => (command) => {
  window.open(url)
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', [
      'open ',
      m('a', { href: url, target: '_blank' }, url)
    ]),
  })
}
