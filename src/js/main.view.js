import m from 'mithril'

// model
import History from './history.model'

// component
import CommandPrompt from './command-prompt.component'

// view
import CommandResult from './command-result.view'

export default {
  view(ctrl) {
    return [
      History.list().map(cmd => m(CommandResult, cmd)),
      m(CommandPrompt, { executed: false }),
    ]
  }
}
