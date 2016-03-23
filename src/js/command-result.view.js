import m from 'mithril'

// component
import CommandPrompt from './command-prompt.component'

export default {
  view(ctrl, result) {
    return m('div.command-result', [
      m('div.command-prompt', [
        m('span.command-prompt--ps', '>'),
        ' ',
        m('span.command-prompt--command', 'make'),
        ' ',
        m('span.command-prompt--input', {
          class: result.success ? 'command-prompt--input__complete' : 'command-prompt--input__error',
        }, result.command),
      ]),
      m('div.command-result--body', result.body),
    ])
  }
}
