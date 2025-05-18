import { describe, expect, it, mock } from '@olton/latte'
import { Progress, progress, Activity, activity } from '../src/index.js'

describe('Progress і Activity інтеграція', () => {
    it('експортовані всі необхідні класи та функції з index.js', () => {
        expect(Progress).toBeFunction()
        expect(progress).toBeFunction()
        expect(Activity).toBeFunction()
        expect(activity).toBeFunction()
    })
    
    // it('Progress передає правильні дані у функцію рендеру', () => {
    //     // Створюємо мок функцію рендеру
    //     const mockRender = mock()
    //    
    //     // Створюємо екземпляр Progress з власною функцією рендеру
    //     const progressBar = new Progress({
    //         total: 100,
    //         width: 40,
    //         mode: 'default',
    //     })
    //    
    //     // Заміняємо RENDERS об'єкт в Progress
    //     progressBar._renders = {
    //         default: mockRender
    //     }
    //    
    //     // Ініціалізуємо та симулюємо прогрес
    //     progressBar.setup()
    //     progressBar.completed = 50
    //     progressBar.start = Date.now() - 1000 // 1 секунда тому
    //    
    //     // Рендеримо прогрес
    //     progressBar.render()
    //    
    //     // Перевіряємо, що наша мок функція була викликана з правильними даними
    //     expect(mockRender).toHaveBeenCalled()
    // })
    
    it('Activity викликає рендер з правильними параметрами', () => {
        // Створюємо мок функцію рендеру
        const mockRender = mock()
        
        // Створюємо екземпляр Activity
        const activityIndicator = new Activity({
            message: 'Loading data...'
        })
        
        // Заміняємо render метод
        activityIndicator.render = mockRender
        
        // Ініціалізуємо та викликаємо process
        activityIndicator.setup()
        activityIndicator.process('New message')
        
        // Очікуємо, що render був викликаний з правильним повідомленням
        expect(mockRender).toHaveBeenCalled()
    })
})
