import { term, Cursor } from '../src/index.js'

console.log(term('Hello World!'))
Cursor.hide()
setTimeout(() => {
  Cursor.show()
}, 2000)
