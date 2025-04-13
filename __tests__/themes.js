import { term, termx, Themes } from "../src/index.js"

console.log(term('Hello world!', {theme: 'ocean'}))
console.log(termx.matrix.write('Hello world!'))
Themes.set("sunset")
console.log(term(`Hello world!`))
