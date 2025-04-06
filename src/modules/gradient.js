// modules/gradient.js
import Colors from './colors.js'
import { CSI } from './esc.js'

export class Gradient {
  constructor (colors = ['#ff0000', '#00ff00']) {
    this.colors = colors.map(color => {
      if (!color.startsWith('#')) {
        color = `#${color}`
      } 
      return this.expandColor(color)
    })
  }

  expandColor(color){
    if (color.length === 7) {
      return color
    }
    let expanded_color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
    return expanded_color.substring(0, 7)
  }
  
  /**
   * Створити градієнтний текст
   * @param {string} text - Текст для відображення
   * @param {Object} options - Опції форматування
   * @returns {string} - Відформатований текст
   */
  colorize (text) {
    if (!text || text.length === 0) return ''

    const chars = text.split('')
    let result = ''

    // Для кожного символа обчислюємо відповідний колір
    for (let i = 0; i < chars.length; i++) {
      const ratio = i / (chars.length - 1 || 1)
      const color = this.interpolateColor(ratio)

      // Застосовуємо колір до поточного символа
      result += `${CSI}${Colors.fromHex(color)}m${chars[i]}`
    }

    // Скидаємо форматування в кінці
    return result + `${CSI}0m`
  }

  /**
   * Створити градієнтний текст зі збереженням додаткових стилів
   * @param {string} text - Текст для відображення
   * @param {string} styleCode - Код стилю у форматі ANSI
   * @returns {string} - Відформатований текст
   */
  colorizeWithStyle (text, styleCode = '') {
    if (!text || text.length === 0) return ''

    const chars = text.split('')
    let result = ''

    // Для кожного символа обчислюємо відповідний колір
    for (let i = 0; i < chars.length; i++) {
      const ratio = i / (chars.length - 1 || 1)
      const color = this.interpolateColor(ratio)

      // Застосовуємо стиль і колір до поточного символа
      if (styleCode) {
        result += `${CSI}${styleCode};${Colors.fromHex(color)}m${chars[i]}`
      } else {
        result += `${CSI}${Colors.fromHex(color)}m${chars[i]}`
      }
    }

    // Скидаємо форматування в кінці
    return result + `${CSI}0m`
  }

  /**
   * Інтерполяція кольору в градієнті
   * @param {number} ratio - Значення від 0 до 1
   * @returns {string} - Колір в HEX форматі
   */
  interpolateColor (ratio) {
    if (this.colors.length === 1) return this.colors[0]

    // Визначаємо, між якими кольорами в масиві ми знаходимося
    const colorPosition = ratio * (this.colors.length - 1)
    const colorIndex = Math.floor(colorPosition)

    // Якщо ми точно на кольорі з масиву, повертаємо його
    if (colorPosition === colorIndex) {
      return this.colors[colorIndex]
    }

    // Інтерполюємо між двома сусідніми кольорами
    const startColor = this.colors[colorIndex]
    const endColor = this.colors[colorIndex + 1]
    const localRatio = colorPosition - colorIndex

    // Конвертуємо HEX в RGB, інтерполюємо, потім конвертуємо назад в HEX
    return this.interpolateHexColors(startColor, endColor, localRatio)
  }

  /**
   * Інтерполяція між двома HEX кольорами
   * @param {string} startColor - Початковий колір в HEX
   * @param {string} endColor - Кінцевий колір в HEX
   * @param {number} ratio - Значення від 0 до 1
   * @returns {string} - Результуючий колір в HEX
   */
  interpolateHexColors (startColor, endColor, ratio) {
    // Видаляємо # якщо є
    const start = startColor.replace('#', '')
    const end = endColor.replace('#', '')

    // Конвертуємо в RGB
    const r1 = parseInt(start.substring(0, 2), 16)
    const g1 = parseInt(start.substring(2, 4), 16)
    const b1 = parseInt(start.substring(4, 6), 16)

    const r2 = parseInt(end.substring(0, 2), 16)
    const g2 = parseInt(end.substring(2, 4), 16)
    const b2 = parseInt(end.substring(4, 6), 16)

    // Інтерполюємо кожен канал
    const r = Math.round(r1 + (r2 - r1) * ratio)
    const g = Math.round(g1 + (g2 - g1) * ratio)
    const b = Math.round(b1 + (b2 - b1) * ratio) // Виправлено тут

    // Конвертуємо назад в HEX
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
}

// Зручна функція для створення градієнтів
export const gradient = (colors) => new Gradient(colors)
