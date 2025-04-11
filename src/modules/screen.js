import { ESC } from './esc.js'

const terminal = process.stdout

const clearScreen = (term = terminal) => { term.write(process.platform === 'win32' ? '\x1bc' : '\x1b[2J\x1b[0f'); }
const clearToEndOfLine = (term = terminal) => term.write(ESC + '[0K')
const clearToBeginOfLine = (term = terminal) => term.write(ESC + '[1K')
const clearLine = (term = terminal) => term.write(ESC + '[2K')
const clearScreenDown = (term = terminal) => term.write(ESC + '[0J')
const clearScreenUp = (term = terminal) => term.write(ESC + '[1J')
const size = (term = terminal) => {
  const { columns, rows } = term
  return { x: columns, y: rows }
}

const Screen = {
  clear: clearScreen,
  clearRight: clearToEndOfLine,
  clearLeft: clearToBeginOfLine,
  clearLine,
  clearDown: clearScreenDown,
  clearUp: clearScreenUp,
  size,
}

export default Screen