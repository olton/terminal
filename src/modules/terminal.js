import Colors from './colors.js'
import Styles from './style.js'
import { CSI } from './esc.js'
import { Gradient } from './gradient.js'

function str2array (str = '') {
  return str.split(',').map(c => c.trim()).filter(c => c)
}

export class Terminal {
  constructor (text = '', options = {}) {
    this.text = text
    this.options = options
  }

  [Symbol.toPrimitive](hint) {
    if (this.text && this.text.length > 0) {
      return this.toString()
    } else {
      return ''
    }
  }
  
  toString () {
    const r = []
    const { style, color, gradient } = this.options
    const [fg = 'default', bg = 'bgDefault'] = str2array(color)
    const styles = str2array(style)
    const gradientColors = str2array(gradient)

    for (const s of styles) {
      if (Styles[s]) r.push(Styles[s])
    }

    if (gradientColors.length > 0) {
      // Якщо вказані градієнтні кольори, використовуємо їх для тексту
      const gradientObj = new Gradient(gradientColors)

      // Застосовуємо стилі якщо вони є
      let styledPrefix = ''
      if (r.length > 0) {
        styledPrefix = `${CSI}${r.join(';')}m`
      }

      // Якщо є фоновий колір, додаємо його до всіх символів
      let bgCode = ''
      if (bg !== 'bgDefault') {
        bgCode = bg.startsWith('#')
          ? Colors.fromHex(bg, true)
          : isNaN(Number(bg))
            ? Colors[Colors.toBg(bg)]
            : Colors.bg(bg)
      }

      // Створюємо градієнтний текст з урахуванням стилів та фону
      if (bgCode) {
        r.push(bgCode)
      }

      if (r.length > 0) {
        // Якщо є стилі або фоновий колір
        return styledPrefix + gradientObj.colorizeWithStyle(this.text, r.join(';'))
      } else {
        // Якщо тільки градієнт
        return gradientObj.colorize(this.text)
      }
    } else {
      r.push(fg.startsWith('#') ? Colors.fromHex(fg) : isNaN(Number(fg)) ? Colors[fg] : Colors.fg(fg))
      r.push(bg.startsWith('#') ? Colors.fromHex(bg, true) : isNaN(Number(bg)) ? Colors[Colors.toBg(bg)] : Colors.bg(bg))
    }

    const output = [CSI, r.join(';'), 'm', this.text, CSI + '0m']
    return output.join('')
  }
}

export const term = (text, options) => new Terminal(text, options).toString()
