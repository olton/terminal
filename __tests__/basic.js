import { term } from '../src/index.js'

console.log(term('Hello World!', { style: 'bold, italic', color: 'redBright' }) + ' - console.log')
console.log(term('Hello World!', { style: 'bold, italic', color: '#ffffff' }) + ' - console.log')
console.log(term('Hello World!', { color: '219' }) + ' - console.log')
console.log(term('Hello World!', { style: 'italic', gradient: '#ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff' }) + ' - console.log')
process.stdout.write(term('Hello World!', { color: 'yellowBright, #00f' }) + ' - stdout.write\n')
