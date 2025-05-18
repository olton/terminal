import ProgressOptions from '../options/progress.js'
import RenderOptions from '../options/render.js'
import defaultRender from '../renders/default.js'
import dotsRender from '../renders/dots.js'
import barRender from '../renders/bar.js'
import { Cursor } from '../../index.js'
import Base from './base.js'

const RENDERS = {
  default: defaultRender,
  dots: dotsRender,
  bar: barRender
}

/**
 * Progress class for displaying a progress bar in the terminal.
 */
export default class Progress extends Base {
  constructor (options = {}) {
    super(ProgressOptions, options)
  }

  /**
   * Sets up the initial state of the Progress instance.
   */
  setup () {
    super.setup()
    this.total = Math.abs(this.options.total || 1)
    this.completed = 0
  }

  /**
   * Processes the progress bar, updating the message if provided.
   * @param msg
   @param step
   */
  process (msg = '', step = 1) {
    this.completed += step
    super.process(msg)
  }

  /**
   * Calculates the progress state.
   * @returns {{percent: number, filledWidth: number, emptyWidth: number, elapsed: number, rate: number, completed: number, total: number, color: string, processMessage: string, processMessageColor: string, type: string, unitName: string, bar: string, empty: string} & {percent: (number|number), filledWidth: (number|number), emptyWidth: number, elapsed: string, rate: (string|string), completed: number, total: *, color: (string|string|*), processMessage: (string|string|*), processMessageColor: (string|string|*), type: (string|string|*), unitName: (string|string|*), bar: (string|any), empty: *}}
   */
  calculate () {
    const percent = this.total ? Math.ceil((this.completed / this.total) * 100) : 0
    const filledWidth = this.total ? Math.ceil((this.completed / this.total) * this.options.width) : 0
    const emptyWidth = this.options.width - filledWidth

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(1)
    const rate = this.completed ? (elapsed / this.completed).toFixed(2) : '0.00'

    return Object.assign({}, RenderOptions, {
      percent,
      filledWidth,
      emptyWidth,
      elapsed,
      rate,
      completed: this.completed,
      total: this.options.total,
      color: this.options.barColor,
      backColor: this.options.backColor,
      message: this.options.message,
      messageColor: this.options.messageColor,
      type: this.options.dotsType,
      unitName: this.options.unitName,
      bar: this.options.bar,
      empty: this.options.empty,
    })
  }

  /**
   * Renders the progress bar in the terminal.
   */
  render () {
    const state = this.calculate()
    const render = RENDERS[this.options.mode] || defaultRender

    if (!this.initied) {
      this.save(state.message)
    }
    
    if (this.position) {
      Cursor.to(this.position.x, this.position.y)
    } else {
      Cursor.restore()
    }
    
    render(this.terminal, state)

    if (this.completed >= this.options.total) {
      this.completeMessage()
    }
  }
}

export const progress = (options = {}) => new Progress(options)