import { CSI, ESC, OSC } from './esc.js'

let terminal = process.stdout
let input = process.stdin

const Cursor = {
  show () { terminal.write(CSI + '?25h') },
  hide () { terminal.write(CSI + '?25l') },
  home() { terminal.write(CSI + 'H') },
  to (x = 0, y = 0) { terminal.write(CSI + `${y};${x}H`) },
  up (n) { terminal.write(CSI + `${n}A`) },
  down (n) { terminal.write(CSI + `${n}B`) },
  left (n) { terminal.write(CSI + `${n}D`) },
  right (n) { terminal.write(CSI + `${n}C`) },
  lineUp () { terminal.write(ESC + 'M') },
  linesUp (n) { terminal.write(CSI + `${n}F`) },
  linesDown (n) { terminal.write(CSI + `${n}E`) },
  col(n) {terminal.write(CSI + `${n}G`)},
  save () { terminal.write(ESC + '7') },
  restore () {  terminal.write(ESC + '8') },
  
  getPos () {
    return new Promise((resolve, reject) => {
      const rawMode = input.isRaw

      input.setEncoding('utf8');
      input.setRawMode && input.setRawMode(true);

      const readfx = function () {
        const buf = input.read();
        const str = JSON.stringify(buf); // "\u001b[9;1R"
        const regex = /\[(.*)/g;
        const str_r = regex.exec(str)
        const xy = !str_r ? [0, 0] : str_r[0].replace(/\[|R"/g, '').split(';');
        const pos = { y: xy[0], x: xy[1] };
        input.setRawMode && input.setRawMode(rawMode);
        resolve(pos);
      }

      input.once('readable', readfx);
      terminal.write('\u001b[6n');
    })
  },
  
  shape: {
    block (blink = false) { blink ?  terminal.write(CSI + '1 q') : terminal.write(CSI + '2 q') },
    line (blink = false) { blink ? terminal.write(CSI + '3 q') : terminal.write(CSI + '4 q') },
    bar (blink = false) { blink ? terminal.write(CSI + '5 q') : terminal.write(CSI + '6 q') },
  },
}

export default Cursor