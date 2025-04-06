import { gradient, term } from '../src/index.js'

// Створити градієнт від червоного до синього
const redToBlue = gradient(['#ff0000', '#0000ff'])

// Відобразити текст із градієнтом
console.log(redToBlue.colorize('Це текст з градієнтним кольором!'))

// Використання декількох кольорів
const rainbow = gradient(['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'])
console.log(rainbow.colorize('Веселка в терміналі'))

console.log(term('Hello World!', { gradient: '#ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff' }))
console.log(term('Hello World!', { style: 'italic', gradient: '#f00, #ff0, #0f0, #0ff, #00f, #f0f' }))
console.log(term('Hello World!', { style: 'italic', gradient: ['#f00', '#ff0'] }))

