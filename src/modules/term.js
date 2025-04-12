import Colors from './colors.js'
import Styles from './style.js'
import { CSI, ESC } from './esc.js'
import { Gradient } from './gradient.js'
import Themes from './themes.js'

function str2array (str = '') {
  return str.split(',').map(c => c.trim()).filter(c => c)
}

export class Term {
  constructor (text = '', options = {}) {
    this.text = text
    this.options = options
  }

  [Symbol.toPrimitive]() {
    if (this.text && this.text.length > 0) {
      return this.toString()
    } else {
      return ''
    }
  }
  
  toString () {
    const r = []
    let { style, color, gradient, theme } = this.options

    if (theme) {
      if (Themes[theme]) {
        color = Themes[theme].color
        style = Themes[theme].style
        gradient = Themes[theme].gradient
      }
    }

    const [fg = 'default', bg = 'bgDefault'] = Array.isArray(color) ? color : str2array(color)
    const styles = Array.isArray(style) ? style : str2array(style)
    const gradientColors = Array.isArray(gradient) ? gradient : str2array(gradient)

    for (const s of styles) {
      if (Styles[s]) r.push(Styles[s])
    }
    
    if (gradientColors.length > 0) {
      const gradientObj = new Gradient(gradientColors)

      let styledPrefix = ''
      if (r.length > 0) {
        styledPrefix = `${CSI}${r.join(';')}m`
      }

      let bgCode = ''
      if (bg !== 'bgDefault') {
        bgCode = bg.startsWith('#')
          ? Colors.fromHex(bg, true)
          : isNaN(Number(bg))
            ? Colors[Colors.toBg(bg)]
            : Colors.bg(bg)
      }

      if (bgCode) {
        r.push(bgCode)
      }

      if (r.length > 0) {
        return styledPrefix + gradientObj.colorizeWithStyle(this.text, r.join(';'))
      } else {
        return gradientObj.colorize(this.text)
      }
    } else {
      r.push((""+fg).startsWith('#') ? Colors.fromHex(fg) : isNaN(Number(fg)) ? Colors[fg] : Colors.fg(fg))
      r.push((""+bg).startsWith('#') ? Colors.fromHex(bg, true) : isNaN(Number(bg)) ? Colors[Colors.toBg(bg)] : Colors.bg(bg))
    }

    if (typeof this.text === 'string' && this.text.includes(CSI)) {
      const styleRegex = new RegExp(`\\x1B\\[[0-9;]+m([\\s\\S]*?)\\x1B\\[0m`, 'g')

      let result = ''
      let lastIndex = 0
      let match

      const currentStyle = `${CSI}${r.join(';')}m`

      while ((match = styleRegex.exec(this.text)) !== null) {
        const textBefore = this.text.substring(lastIndex, match.index)
        if (textBefore) {
          result += currentStyle + textBefore + `${CSI}0m`
        }
        result += match[0]
        lastIndex = match.index + match[0].length
      }

      const textAfter = this.text.substring(lastIndex)
      if (textAfter) {
        result += currentStyle + textAfter + `${CSI}0m`
      }

      return result
    } else {
      const output = [CSI, r.join(';'), 'm', this.text, CSI + '0m']
      return output.join('')
    }
  }
}

export const term = (text, options) => {
  const currentTheme = Themes.currentTheme

  if (currentTheme) {
    options = { ...options, ...currentTheme }
  }

  return new Term(text, options).toString()
}
