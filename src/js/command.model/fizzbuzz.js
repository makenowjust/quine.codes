import m from 'mithril'

import { resolve } from './util'

export default (command) => {
  const items = []
  for (let i = 1; i <= 100; i++) {
    const fb = []
    if (i % 3 === 0) fb.push(m('span.command-result--body-fizz', 'Fizz'))
    if (i % 5 === 0) fb.push(m('span.command-result--body-buzz', 'Buzz'))

    items.push(m('li', fb.length > 0 ? fb : '' + i))
  }

  return resolve({
    command,
    success: true,
    body: m('ul.command-result--body-fizzbuzz', items),
  })
}

