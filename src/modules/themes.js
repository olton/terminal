import { CSI, ESC } from './esc.js'
import Colors from './colors.js'

const terminal = process.stdout

export default {
  currentTheme: null,

  default: {
    color: ['default', 'bgDefault'],
    style: [],
  },
  sunset: {
    color: ['#FFDDCC', '#331122'],
    style: ['italic'],
  },
  ocean: {
    color: ['#00CCFF', '#001122'],
    style: ['bold'],
  },
  forest: {
    color: ['#00FF00', '#003300'],
    style: ['underline'],
  },
  desert: {
    color: ['#CCAA00', '#331100'],
    style: [],
  },
  twilight: {
    color: ['#AA00FF', '#220022'],
    style: ['inverse'],
  },
  matrix: {
    color: ['#00FF00', '#000000'],
    style: ['bold'],
  },  
  error: {
    color: ['#FF5555', '#000000'],
    style: ['bold'],
  },
  warning: {
    color: ['#FFAA00', '#000000'],
    style: ['bold'],
  },
  success: {
    color: ['#00FF00', '#000000'],
    style: ['bold'],
  },
  info: {
    color: ['#00AAFF', '#000000'],
    style: ['bold'],
  },
  
  set(theme = 'sunset', changeConsoleColor = false) {
    const selectedTheme = this[theme] || this.default
    const { color, style } = selectedTheme

    this.currentTheme = { color, style }

    if (changeConsoleColor) {
      const fg = Colors.get(color[0], false)
      const bg = Colors.get(color[1], true)
  
      terminal.write(`${CSI}${fg}m`)    
      terminal.write(`${CSI}${bg}m`)    
      terminal.write(`${CSI}K`)    
      terminal.write(`${CSI}2J${CSI}0;0H`)
    }
  },
  
  reset(){
    terminal.write(`${CSI}0m`)
    terminal.write(`${CSI}2J${CSI}0;0H`)
    this.currentTheme = null
  },
  
  add(name, theme) {
    this[name] = theme
  }
}