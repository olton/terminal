const Colors = {
  black: '30',
  red: '31',
  green: '32',
  yellow: '33',
  blue: '34',
  magenta: '35',
  cyan: '36',
  white: '37',
  blackBright: '90',
  redBright: '91',
  greenBright: '92',
  yellowBright: '93',
  blueBright: '94',
  magentaBright: '95',
  cyanBright: '96',
  whiteBright: '97',
  bgBlack: '40',
  bgRed: '41',
  bgGreen: '42',
  bgYellow: '43',
  bgBlue: '44',
  bgMagenta: '45',
  bgCyan: '46',
  bgWhite: '47',
  bgBlackBright: '100',
  bgRedBright: '101',
  bgGreenBright: '102',
  bgYellowBright: '103',
  bgBlueBright: '104',
  bgMagentaBright: '105',
  bgCyanBright: '106',
  bgWhiteBright: '107',
  default: '39',
  bgDefault: '49',
  gray: '38;5;245',
  bgGray: '48;5;245',
  grayBright: '38;5;250',
  bgGrayBright: '48;5;250',

  fromHex: (hex, bg = false) => {
    if (hex.startsWith('#')) hex = hex.slice(1)
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('')
    }
    if (hex.length !== 6) {
      throw new Error('Invalid hex color format')
    }
    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `${bg ? '48' : '38'};2;` + [r, g, b].join(';')
  },

  toBg: (color) => {
    if (color.startsWith('bg')) return color
    if (color.startsWith('#')) return Colors.fromHex(color, true)
    return 'bg' + color.charAt(0).toUpperCase() + color.slice(1)
  },

  fg: (index) => `38;5;${index}`,
  bg: (index) => `48;5;${index}`
}

export default Colors
