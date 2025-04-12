import {Cursor} from '../src/index.js'

console.log('Hello World!')
;['block','underline','bar'].forEach((shape, index) => {
  setTimeout(() => {
    console.log(`Cursor shape: ${shape}`)
    Cursor.shape[shape]()
  }, index * 5000)
})

setTimeout(() => {
  console.log('Cursor shape: block')
  Cursor.shape.block()
}, 30000)