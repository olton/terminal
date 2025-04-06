import { CSI, ESC } from './esc.js'

export default class Cursor {
  static terminal = process.stdout
  
  static setTerminal (terminal) {
    this.terminal = terminal
    return this
  }
  
  static show () {
    this.terminal.write(CSI + '?25h')
    return this
  }

  static hide () {
    this.terminal.write(CSI + '?25l')
    return this
  }

  static to (x = 0, y = 0) {
    this.terminal.write(CSI + `${y};${x}H`)
    return this
  }

  static up (n) {
    this.terminal.write(CSI + `${n}A`)
    return this
  }

  static down (n) {
    this.terminal.write(CSI + `${n}B`)
    return this
  }

  static left (n) {
    this.terminal.write(CSI + `${n}D`)
    return this
  }

  static right (n) {
    this.terminal.write(CSI + `${n}C`)
    return this
  }

  static lineUp (n) {
    this.terminal.write(ESC + 'M')
    return this
  }

  static linesUp (n) {
    this.terminal.write(CSI + `${n}F`)
    return this
  }

  static linesDown (n) {
    this.terminal.write(CSI + `${n}E`)
    return this
  }

  static save () {
    this.terminal.write(ESC + '7')
    return this
  }

  static restore () {
    this.terminal.write(ESC + '8')
    return this
  }

  static getPos () {
    return new Promise((resolve, reject) => {
      const termcodes = { cursorGetPosition: '\u001b[6n' };
      const rawMode = process.stdin.isRaw

      process.stdin.setEncoding('utf8');
      process.stdin.setRawMode(true);

      const readfx = function () {
        const buf = process.stdin.read();
        const str = JSON.stringify(buf); // "\u001b[9;1R"
        const regex = /\[(.*)/g;
        const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';');
        const pos = { y: xy[0], x: xy[1] };
        process.stdin.setRawMode(rawMode);
        resolve(pos);
      }

      process.stdin.once('readable', readfx);
      process.stdout.write(termcodes.cursorGetPosition);
    })
  }
}
