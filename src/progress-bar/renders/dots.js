import RenderOptions from '../options/render.js'
import { dots, clock, moon, earth, line, windows } from "../helpers/frames.js"
import { term, Screen } from '../../index.js'

const FRAMES = {
  dots,
  clock,
  moon,
  earth,
  line, 
  windows,
}

let index = 0

export default function (terminal, state = {}) {
  const {
    percent,
    elapsed,
    rate,
    completed,
    total,
    color = 'green',
    message,
    messageColor = 'gray',
    type = 'dots'
  } = Object.assign({}, RenderOptions, state)

  const frames = FRAMES[type] || FRAMES.dots

  index++
  if (index >= frames.length) {
    index = 0
  }

  const frame = completed >= total ? '√' : frames[index]
  const msg = message
    .replace(/{{percent}}/g, percent)
    .replace(/{{completed}}/g, completed)
    .replace(/{{total}}/g, total)
    .replace(/{{elapsed}}/g, elapsed)
    .replace(/{{rate}}/g, rate)

  terminal.write("\r")
  Screen.clearLine()
  terminal.write(term(`${frame} ${term(msg, {color: messageColor})} `, { color }))
}
