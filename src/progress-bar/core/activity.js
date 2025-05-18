import ActivityOptions from '../options/activity.js'
import { dots, moon, clock, earth, line, windows } from '../helpers/frames.js'
import { term, Cursor, Screen } from '../../index.js'
import Base from './base.js'

const FRAMES = {
    dots,
    clock,
    moon,
    earth,
    line,
    windows,
}

/**
 * Activity class for displaying a loading animation in the terminal.
 */
export default class Activity extends Base {
    constructor (options = {}) {
        super(ActivityOptions, options)
    }

    setup () {
        super.setup()
        this.index = 0
        this.interval = null
    }
    
    /**
     * Renders the loading animation in the terminal.
     */
    render () {
        const { 
            message = 'Processing...', 
            color = 'green', 
            messageColor = 'white',
            type = 'dots',
        } = this.options

        if (!this.initied) {
            this.save(message)
        }

        if (this.position) {
            Cursor.to(this.position.x, this.position.y)
        } else {
            Cursor.restore()
        }

        const frames = FRAMES[type] || FRAMES.dots

        this.index++
        if (this.index >= frames.length) {
            this.index = 0
        }

        const frame = frames[this.index]

        this.write("\r")
        this.write(term(`${frame} ${term(message, {color: messageColor})}`, {color}))
        Screen.clearRight() 
    }

    /**
     * Starts the loading animation with an optional message and timeout.
     * @param msg
     * @param timeout
     */
    run (msg = '', timeout = 0) {
        this.interval = setInterval(() => {
            this.process(msg)
        }, 100)
        if (timeout) {
            setTimeout(() => {
                this.stop()
            }, timeout)
        }
    }

    /**
     * Stops the loading animation and clears the message.
     * @param msg
     */
    stop (msg) {
        clearInterval(this.interval)
        this.interval = null
        Cursor.show()
        this.completeMessage(msg)
    }
}

export const activity = (options = {}) => new Activity(options)