import { term } from '../src/index.js'

console.log(term('Welcome to @olton/terminal!', { style: 'bold, italic', color: 'redBright' }))
console.log(term('Welcome to @olton/terminal!', { style: ['bold', 'italic'], color: '#ffffff' }))
console.log(term('Welcome to @olton/terminal!', { style: ['bold', 'italic'], color: ['#ffffff', '#00f'] }))
console.log(term('Welcome to @olton/terminal!', { color: '219' }))
console.log(term('Welcome to @olton/terminal!', { style: 'italic', gradient: '#ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff' }))
