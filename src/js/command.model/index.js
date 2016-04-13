import m from 'mithril'

import { resolve } from './util'
import markdown from './markdown'
import open from './open'
import image from './image'
import helloworld from './helloworld'
import fizzbuzz from './fizzbuzz'
import date from './date'

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
  ['blog'       , open('https://makenowjust.github.io/commlog')],
  ['github'     , open('https://github.com/MakeNowJust')],
  ['repo'       , open('https://github.com/MakeNowJust/quine.codes')],
  ['tweet'      , open('https://twitter.com/intent/tweet?text=make%20now%20just%20-&url=https%3A%2F%2Fquine.codes%2F&via=make_now_just')],
  ['twitter'    , open('https://twitter.com/make_now_just')],
  ['qiita'      , open('https://qiita.com/make_now_just')],
  ['like'       , open('https://www.facebook.com/dialog/feed?app_id=1534223720205904&link=https://quine.codes/&redirect_uri=https://quine.codes/')],
  ['facebook'   , open('https://www.facebook.com/make.now.just')],
  ['icon'       , image('img/tsumugu.png')],
  ['tsumugu'    , image('img/tsumugu.png')],
  ['zoi'        , image('https://pbs.twimg.com/media/BspTawrCEAAwQnP.jpg:large')],
  ['helloworld' , helloworld],
  ['hello world', helloworld],
  ['fizzbuzz'   , fizzbuzz],
  ['fizz buzz'  , fizzbuzz],
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
    const action = COMMAND_LIST.filter(action => action[0].lastIndexOf(command, 0) === 0)[0]
    if (!action) {
      return null
    }

    return action[0].slice(command.length)
  }
}
