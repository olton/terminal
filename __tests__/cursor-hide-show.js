import { term, cursor } from '../src/index.js'

const c = cursor()

console.log(term('Hello World!'))
c.hide()
setTimeout(() => {
  c.show()
}, 2000)
