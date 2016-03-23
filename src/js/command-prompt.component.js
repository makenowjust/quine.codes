import m from 'mithril'

// model
import Command from './command.model'
import History from './history.model'

const watchInput = ({enter, tab}) => event => {
  m.redraw.strategy('none')

  if (event.keyCode === 9) {
    tab()
    m.redraw.strategy('diff')
    event.preventDefault()
  }

  if (event.keyCode === 13) {
    enter()
    m.redraw.strategy('diff')
    event.preventDefault()
  }
}

export default {
  controller() {
    this.inputWidth = m.prop(0)
    this.command = m.prop('')
    this.suggest = m.prop('now just')
    this.executing = m.prop(false)
    this.inputElem = m.prop(null)

    let context = (() => {
      let canvas = document.createElement('canvas')
      return canvas.getContext('2d')
    })()

    const calcInputWidth = command => context.measureText(command).width

    this.getFontInfo = (element, isInitialized) => {
      if (isInitialized) return

      const style = window.getComputedStyle(element, null)
      context.font = `${style['font-size']} ${style['font-family']}`
    }

    this.focusInput = () => {
      const elem = this.inputElem()
      if (elem) elem.focus()
    }

    this.update = (command) => {
      this.command(command)
      this.suggest(Command.suggest(command))
      this.inputWidth(calcInputWidth(command))
    }

    this.useSuggest = () => {
      this.update(`${this.command()}${this.suggest() || ''}`)
    }

    this.execute = () => {
      this.executing(true)
      Command.execute(this.command())
        .then(result => {
          History.push(result)

          this.executing(false)
          this.update('')
        })
    }
  },

  view(ctrl, args) {
    const suggest = ctrl.suggest()

    return m('div.command-prompt[tabIndex=-1]', {
      config: ctrl.getFontInfo,
      onfocus: ctrl.focusInput,
    }, [
      m('span.command-prompt--ps', '>'),
      ' ',
      m('span.command-prompt--command', 'make'),
      ' ',
      m('input[type=text].command-prompt--input', {
        value: ctrl.command(),
        disable: ctrl.executing(),
        class: suggest === null ? 'command-prompt--input__error' :
               suggest === ''   ? 'command-prompt--input__complete' : '',
        style: {
          width: `${ctrl.inputWidth()}px`,
        },
        config: ctrl.inputElem,
        oninput: m.withAttr('value', ctrl.update),
        onkeydown: watchInput({
          enter: ctrl.execute,
          tab: ctrl.useSuggest,
        }),
      }),
      m('span.command-prompt--suggest', suggest || ''),
    ])
  }
}
