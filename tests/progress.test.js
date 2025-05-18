import { describe, expect, it, mock } from '@olton/latte'
import Progress, { progress } from '../src/core/progress.js'
import ProgressOptions from '../src/options/progress.js'

describe('Progress class', () => {
    it('створює екземпляр класу Progress з правильними налаштуваннями за замовчуванням', () => {
        const progressBar = new Progress()
        
        expect(progressBar).toBeDefined()
        expect(progressBar.options).toBeDefined()
        expect(progressBar.options.total).toBe(0)
        expect(progressBar.options.width).toBe(30)
    })
    
    it('створює екземпляр класу Progress з користувацькими налаштуваннями', () => {
        const customOptions = {
            total: 100,
            width: 50,
            barColor: 'red',
            mode: 'dots'
        }
        
        const progressBar = new Progress(customOptions)
        
        expect(progressBar.options.total).toBe(customOptions.total)
        expect(progressBar.options.width).toBe(customOptions.width)
        expect(progressBar.options.barColor).toBe(customOptions.barColor)
        expect(progressBar.options.mode).toBe(customOptions.mode)
    })
    
    it('коректно ініціалізує початковий стан через метод setup', () => {
        const progressBar = new Progress({
            total: 50
        })
        
        progressBar.setup()
        
        expect(progressBar.total).toBe(50)
        expect(progressBar.completed).toBe(0)
    })
    
    it('збільшує значення completed при виклику process', () => {
        const progressBar = new Progress({
            total: 100
        })
        
        progressBar.setup()
        progressBar.process('Processing...', 10)
        
        expect(progressBar.completed).toBe(10)
        
        progressBar.process('Continue...', 15)
        
        expect(progressBar.completed).toBe(25)
    })
    
    it('правильно розраховує стан прогресу через метод calculate', () => {
        const progressBar = new Progress({
            total: 100,
            width: 40,
            barColor: 'blue'
        })
        
        progressBar.setup()
        progressBar.completed = 25
        progressBar.start = Date.now() - 5000 // 5 секунд тому
        
        const state = progressBar.calculate()
        
        expect(state.percent).toBe(25)
        expect(state.filledWidth).toBe(10) // 25% від width = 40
        expect(state.emptyWidth).toBe(30) // width - filledWidth = 30
        expect(state.completed).toBe(25)
        expect(state.total).toBe(100)
        expect(state.color).toBe('blue')
    })
    
    it('повертає правильний результат через функцію-обгортку progress', () => {
        const options = {
            total: 200,
            width: 60
        }
        
        const progressInstance = progress(options)
        
        expect(progressInstance).toBeInstanceOf(Progress)
        expect(progressInstance.options.total).toBe(options.total)
        expect(progressInstance.options.width).toBe(options.width)
    })
})
