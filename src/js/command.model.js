import m from 'mithril'
import marked from 'marked'
import h from 'h.js'

marked.setOptions({
  highlight(code, lang) {
    return lang === 'javascript' ? h(code) : code
  },
})

const resolve = (value) => {
  const deferred = m.deferred()
  deferred.resolve(value)
  return deferred.promise
}

const MARKDOWN_CACHE = {}

const markdown = (name) => (command) => {
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
    return resolve({
      command,
      success: true,
      body: MARKDOWN_CACHE[name].body,
    })
  }

  return m.request({
    method: 'GET',
    url   : `markdown/${name}.md`,
    deserialize: text => text,
  }).then(onSuccess, onFailure)
}

const open = (url) => (command) => {
  window.open(url)
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', [
      'open ',
      m('a', { href: url }, url)
    ]),
  })
}

const image = (url) => (command) => {
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', [
      m('img', { src: url }),
    ]),
  })
}

const helloworld = (command) => {
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', 'Hello, world!'),
  })
}

const fizzbuzz = (command) => {
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

const date = (command) => {
  return resolve({
    command,
    success: true,
    body: m('span.command-result--body-success', new Date().toString()),
  })
}

const COMMAND_LIST = [
  ['now just'   , markdown('help')],
  ['help'       , markdown('help')],
  ['profile'    , markdown('profile')],
  ['bio'        , markdown('profile')],
  ['social'     , markdown('social')],
  ['sns'        , markdown('social')],
  ['work'       , markdown('work')],
  ['works'      , markdown('work')],
  ['contact'    , open('mail:make.just.on@gmail.com')],
  ['github'     , open('https://github.com/MakeNowJust')],
  ['twitter'    , open('https://twitter.com/make_now_just')],
  ['qiita'      , open('https://qiita.com/make_now_just')],
  ['icon'       , image('img/tsumugu.png')],
  ['tsumugu'    , image('img/tsumugu.png')],
  ['helloworld', helloworld],
  ['hello world', helloworld],
  ['fizzbuzz'   , fizzbuzz],
  ['fizz buzz'   , fizzbuzz],
  ['date'       , date],
]

export default {
  execute(command) {
    const action = COMMAND_LIST.filter(action => action[0] === command)[0]
    if (!action) {
      return resolve({
        command,
        success: false,
        body: m('span.command-result--body-error', 'command not found'),
      })
    }

    return action[1](command)
  },

  suggest(command) {
    const action = COMMAND_LIST.filter(action => action[0].startsWith(command))[0]
    if (!action) {
      return null
    }

    return action[0].slice(command.length)
  }
}
