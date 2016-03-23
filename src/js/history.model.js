import m from 'mithril'

export default {
  list: m.prop([]),

  push(cmd) {
    this.list().push(cmd)
  },
}
