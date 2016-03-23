import m from 'mithril'

import { resolve } from './util'

export default (url) => (command) => {
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', [
      m('img', { src: url }),
    ]),
  })
}
