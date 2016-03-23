import m from 'mithril'

import { resolve } from './util'

export default (command) => {
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', new Date().toString()),
  })
}

