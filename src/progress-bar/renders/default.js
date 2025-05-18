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
        backColor,
        unitName = 'unit',
        bar = '█',
        empty = '░',
    } = { ...RenderOptions, ...state }

    if (bar.length >= 1) {
        bar = bar[0]
    } else {
        bar = '█'
    }

    if (empty.length >= 1) {
        empty = empty[0]
    } else {
        empty = '░'
    }

    terminal.write('\r')
    Screen.clearLine()
    terminal.write(term(`[${bar.repeat(filledWidth)}${term(empty.repeat(emptyWidth > 0 ? emptyWidth : 0), { color: backColor })}] ${percent}% `, { color }))
    terminal.write(term(`(${completed}/${total}) `, { color: 'yellow' }))
    terminal.write(term(`${elapsed}s elapsed, ${rate}s/${unitName}`, { color: 'gray' }))
}
