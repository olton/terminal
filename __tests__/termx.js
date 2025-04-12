import {termx} from '../src/index.js'

console.log(termx.bold.yellow.bgBlue.write(`Hello ${termx.whiteBright.bgRedBright.write('World')} Hello!`))
console.log(termx.gradient("#0000FF", "#FFFF00").write('Hello World!'))
console.log(termx.hex("#FFFF00", "#0000FF").write('Hello World!'))
console.log(termx.ind(219, 33).italic.write('Hello World!'))
console.log(termx.error('Error Message'))
console.log(termx.warning('Warning Message'))
console.log(termx.info('Info Message'))
console.log(termx.underline.write('Info Message'))
console.log(termx.inverse.write('Info Message'))
console.log(termx.blink.success('Success Message'))