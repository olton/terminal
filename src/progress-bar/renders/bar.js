import RenderOptions from '../options/render.js'
import { Screen, term } from '../../index.js'

export default function (terminal, state = {}) {
    let {
        percent,
        filledWidth,
        emptyWidth,
        elapsed,
        rate,
        completed,
        total,
        color = 'green',
        message,
        messageColor = 'gray',
        bar = '◼',
    } = { ...RenderOptions, ...state }

    if (bar.length >= 1) {
        bar = bar[0]
    } else {
        bar = '◼'
    }

    const msg = message
        .replace(/{{percent}}/g, percent)
        .replace(/{{completed}}/g, completed)
        .replace(/{{total}}/g, total)
        .replace(/{{elapsed}}/g, elapsed)
        .replace(/{{rate}}/g, rate)

    terminal.write('\r')
    Screen.clearLine()
    terminal.write(term(`${term(`[${bar.repeat(filledWidth)}${term(' '.repeat(emptyWidth > 0 ? emptyWidth : 0), { color: 'default' })}]`, { color })} ${msg}`, { color: messageColor }))
}
