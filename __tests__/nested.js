import { term, termx } from '../src/index.js'

console.log( term(`White ${term('red', { color: 'red' })} white ${term('green', { color: 'green' })}`, {color: 'white'}) )
console.log( termx.white.write(`White ${termx.red.write('red')} white ${termx.green.write('green')}`) )