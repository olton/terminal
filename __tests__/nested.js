import { term } from '../src/index.js'

console.log(
  term(`Nested ${term('text', { color: 'red' })} with ${term('color', { color: 'green' })}`, {color: 'blue'})
)