import { CSI, ESC } from './esc.js'

const defaultOptions = {
  terminal: process.stdout,
  hide: false
}

export class Cursor {
  constructor (options = {}) {
    this.options = { ...defaultOptions, ...options }
    this.terminal = this.options.terminal
    if (this.options.hide) {
      this.hide()
    }
    if (this.options.x || this.options.y) {
      this.to(this.options.x, this.options.y)
    }
  }

  show () {
    this.terminal.write(CSI + '?25h')
    return this
  }

  hide () {
    this.terminal.write(CSI + '?25l')
    return this
  }

  to (x = 0, y = 0) {
    this.terminal.write(CSI + `${y};${x}H`)
    return this
  }

  up (n) {
    this.terminal.write(CSI + `${n}A`)
    return this
  }

  down (n) {
    this.terminal.write(CSI + `${n}B`)
    return this
  }

  left (n) {
    this.terminal.write(CSI + `${n}D`)
    return this
  }

  right (n) {
    this.terminal.write(CSI + `${n}C`)
    return this
  }

  lineUp (n) {
    this.terminal.write(ESC + 'M')
    return this
  }

  linesUp (n) {
    this.terminal.write(CSI + `${n}F`)
    return this
  }

  linesDown (n) {
    this.terminal.write(CSI + `${n}E`)
    return this
  }

  save () {
    this.terminal.write(ESC + '7')
    return this
  }

  restore () {
    this.terminal.write(ESC + '8')
    return this
  }

  getPos () {
    return new Promise((resolve, reject) => {
      this.terminal.write(CSI + '6n')
      process.stdin.once('data', (data) => {
        const match = data.toString().match(/\[(\d+);(\d+)R/)
        if (match) {
          const x = parseInt(match[2], 10)
          const y = parseInt(match[1], 10)
          resolve({ x, y })
        } else {
          reject(new Error('Failed to get cursor position'))
        }
      })
    })
  }
}

export const cursor = (options) => new Cursor(options)
