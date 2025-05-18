import repeat from '../helpers/repeat.js'
import { Cursor, Screen, term } from '../../index.js'

export default class Base {
  terminal = process.stdout
  options = {}
  position = null
  initied = false
  
  constructor (defaults, options) {
    this.options = Object.assign({}, defaults, options)
    this.setup()
  }

  /**
   * Sets up the initial state of the Activity instance.
   */
  setup () {
    this.start = Date.now()
    if (this.options.cursor === false) {
      Cursor.hide()
    }
  }

  /**
   * Resets the Activity instance with new options.
   * @param options
   */
  reset (options = {}) {
    this.options = Object.assign({}, this.options, options)
    this.setup()
  }

  /**
   * Writes a message to the terminal.
   * @param msg
   */
  write (msg) {
    this.terminal.write(msg)
  }
  
  /**
   * Save Activity position.
   * @param msg
   * @returns {void}
   */
  save (msg = '') {
    this.initied = true
    const o = this.options
    if (msg) { o.message = msg }
    if (o.spaceBefore) { this.write(repeat('\n', this.options.spaceBefore)) }
    Cursor.save()
    this.write(repeat('\n', this.options.spaceAfter + 1))
  }

  /**
   * Sets the cursor position to the specified coordinates.
   */
  async here () {
    const o = this.options

    if (o.spaceBefore) { 
      this.write(repeat('\n', this.options.spaceBefore)) 
    }

    const pos = await Cursor.getPos()
    this.position = { ...pos }

    this.write(repeat('\n', this.options.spaceAfter + 1))
    
    return this.position
  }
  
  /**
   * Processes the loading animation, updating the message if provided.
   * @param msg
   * @param step
   */
  process (msg = '', step = 1) {
    if (msg) {
      this.options.message = msg
    }
    this.render()
  }

  render () {
    throw new Error('Method render() must be implemented in derived classes')
  }

  /**
   * Displays the completion message after stopping the loading animation.
   * @param msg
   */
  completeMessage (msg) {
    let { completeMessageColor, completeMessage } = this.options

    if (msg) { completeMessage = msg }
    if (!completeMessage) { return }

    const elapsed = ((Date.now() - this.start) / 1000).toFixed(2)
    const message = completeMessage
      .replace(/{{elapsed}}/g, elapsed)

    this.write('\r')
    Screen.clearLine()
    this.write(term(message, {color: completeMessageColor}))
  }
}