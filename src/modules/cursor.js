import { CSI, ESC } from './esc.js'

let terminal = process.stdout
let input = process.stdin

const Cursor = {
  show () { terminal.write(CSI + '?25h') },
  hide () { terminal.write(CSI + '?25l') },
  to (x = 0, y = 0) { terminal.write(CSI + `${y};${x}H`) },
  up (n) { terminal.write(CSI + `${n}A`) },
  down (n) { terminal.write(CSI + `${n}B`) },
  left (n) { terminal.write(CSI + `${n}D`) },
  right (n) { terminal.write(CSI + `${n}C`) },
  lineUp (n) { terminal.write(ESC + 'M') },
  linesUp (n) { terminal.write(CSI + `${n}F`) },
  linesDown (n) { terminal.write(CSI + `${n}E`) },
  save () { terminal.write(ESC + '7') },
  restore () {  terminal.write(ESC + '8') },
  getPos () {
    return new Promise((resolve, reject) => {
      const rawMode = input.isRaw

      input.setEncoding('utf8');
      input.setRawMode(true);

      const readfx = function () {
        const buf = input.read();
        const str = JSON.stringify(buf); // "\u001b[9;1R"
        const regex = /\[(.*)/g;
        const xy = regex.exec(str)[0].replace(/\[|R"/g, '').split(';');
        const pos = { y: xy[0], x: xy[1] };
        input.setRawMode(rawMode);
        resolve(pos);
      }

      input.once('readable', readfx);
      terminal.write('\u001b[6n');
    })
  }
}

export default Cursor