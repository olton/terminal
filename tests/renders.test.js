import { describe, expect, it, mock, spy } from '@olton/latte'
import defaultRender from '../src/renders/default.js'
import barRender from '../src/renders/bar.js'
import RenderOptions from '../src/options/render.js'

describe('Render functions', () => {
    it('defaultRender викликає потрібні методи терміналу', () => {
        // Створюємо мок-об'єкт терміналу
        const terminal = process.stdout
        terminal.write = spy(terminal.write)
        
        // Стан прогресу для тесту
        const state = {
            percent: 50,
            filledWidth: 15,
            emptyWidth: 15,
            elapsed: "5.0",
            rate: "0.10",
            completed: 50,
            total: 100,
            color: 'green',
            backColor: 'gray',
            unitName: 'item',
            bar: '█',
            empty: '░'
        }
        
        // Викликаємо функцію рендеру
        defaultRender(terminal, state)
        
        // Перевіряємо, що термінал.write був викликаний
        expect(terminal.write.callCount).toBe(5)
    })
    
    it('barRender викликає потрібні методи терміналу', () => {
        // Створюємо мок-об'єкт терміналу
        const terminal = process.stdout
        terminal.write = spy(terminal.write)
        
        // Стан прогресу для тесту
        const state = {
            percent: 75,
            filledWidth: 22,
            emptyWidth: 8,
            elapsed: "3.5",
            rate: "0.05",
            completed: 75,
            total: 100,
            color: 'blue',
            message: 'Processing {{percent}}% ({{completed}}/{{total}}) - {{elapsed}}s',
            messageColor: 'gray',
            bar: '◼'
        }
        
        // Викликаємо функцію рендеру
        barRender(terminal, state)
        
        // Перевіряємо, що термінал.write був викликаний
        expect(terminal.write.callCount).toBe(3)
    })
})
