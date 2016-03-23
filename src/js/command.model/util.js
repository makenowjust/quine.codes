import m from 'mithril'

export function resolve(value) {
  const deferred = m.deferred()
  deferred.resolve(value)
  return deferred.promise
}
