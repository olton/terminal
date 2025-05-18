import { describe, it, expect, mock, beforeEach, afterEach } from "@olton/latte"
import { term, Cursor, Screen } from '@olton/terminal'
import Activity, { activity } from '../src/core/activity.js'
import ActivityOptions from '../src/options/activity.js'

describe('Activity class', () => {
    it('створює екземпляр класу Activity з правильними налаштуваннями за замовчуванням', () => {
        const activityIndicator = new Activity()
        
        expect(activityIndicator).toBeDefined()
        expect(activityIndicator.options).toBeDefined()
    })
    
    it('створює екземпляр класу Activity з користувацькими налаштуваннями', () => {
        const customOptions = {
            message: 'Loading...',
            color: 'cyan',
            type: 'dots'
        }
        
        const activityIndicator = new Activity(customOptions)
        
        expect(activityIndicator.options.message).toBe(customOptions.message)
        expect(activityIndicator.options.color).toBe(customOptions.color)
        expect(activityIndicator.options.type).toBe(customOptions.type)
    })
    
    it('коректно ініціалізує початковий стан через метод setup', () => {
        const activityIndicator = new Activity()
        
        activityIndicator.setup()
        
        // Перевіряємо, що start встановлено як timestamp
        expect(activityIndicator.start).toBeNumber()
        expect(activityIndicator.start).toBeLessThanOrEqual(Date.now())
    })
    
    it('оновлює повідомлення при виклику process', () => {
        const activityIndicator = new Activity()
        
        activityIndicator.setup()
        activityIndicator.process('New message')
        
        // Перевіряємо, що processMessage оновлено
        expect(activityIndicator.options.message).toBe('New message')
    })
    
    it('повертає правильний результат через функцію-обгортку activity', () => {
        const options = {
            message: 'Processing...',
            color: 'yellow'
        }
        
        const activityInstance = activity(options)
        
        expect(activityInstance).toBeInstanceOf(Activity)
        expect(activityInstance.options.message).toBe(options.message)
        expect(activityInstance.options.color).toBe(options.color)
    })
})
describe("Activity class", () => {
    let activityInstance
    
    beforeEach(() => {
        // Підготовка тестового оточення
        activityInstance = new Activity()
        // Створимо мок для методу write, щоб не виводити в термінал під час тестів
        activityInstance.write = mock(() => {})
    })
    
    afterEach(() => {
        if (activityInstance.interval) {
            activityInstance.stop()
        }
    })
    
    it("створює екземпляр Activity з типовими опціями", () => {
        expect(activityInstance).toBeDefined()
        expect(activityInstance.options).toBeDefined()
        expect(activityInstance.options.type).toBe("dots")
    })
    
    it("створює екземпляр Activity з власними опціями", () => {
        const customOptions = {
            type: "moon",
            color: "blue",
            message: "Тестування...",
            messageColor: "cyan"
        }
        
        const customActivity = new Activity(customOptions)
        
        expect(customActivity.options.type).toBe("moon")
        expect(customActivity.options.color).toBe("blue")
        expect(customActivity.options.message).toBe("Тестування...")
        expect(customActivity.options.messageColor).toBe("cyan")
    })
    
    it("правильно ініціалізує властивості в методі setup", () => {
        activityInstance.setup()
        
        expect(activityInstance.index).toBe(0)
        expect(activityInstance.interval).toBeNull()
    })
    
    it("правильно вибирає набір кадрів на основі типу", () => {
        // Мокуємо term для перевірки render
        const originalTerm = term
        global.term = mock((str, options) => str)
        
        const dotActivity = new Activity({ type: "dots" })
        dotActivity.write = mock(() => {})
        dotActivity.save = mock(() => {})
        dotActivity.render()
        
        const moonActivity = new Activity({ type: "moon" })
        moonActivity.write = mock(() => {})
        moonActivity.save = mock(() => {})
        moonActivity.render()
        
        const clockActivity = new Activity({ type: "clock" })
        clockActivity.write = mock(() => {})
        clockActivity.save = mock(() => {})
        clockActivity.render()
        
        const earthActivity = new Activity({ type: "earth" })
        earthActivity.write = mock(() => {})
        earthActivity.save = mock(() => {})
        earthActivity.render()
        
        const lineActivity = new Activity({ type: "line" })
        lineActivity.write = mock(() => {})
        lineActivity.save = mock(() => {})
        lineActivity.render()
        
        const windowsActivity = new Activity({ type: "windows" })
        windowsActivity.write = mock(() => {})
        windowsActivity.save = mock(() => {})
        windowsActivity.render()
        
        // Відновлюємо оригінальну функцію
        global.term = originalTerm
        
        expect(dotActivity.index).toBe(1)
        expect(moonActivity.index).toBe(1)
        expect(clockActivity.index).toBe(1)
        expect(earthActivity.index).toBe(1)
        expect(lineActivity.index).toBe(1)
        expect(windowsActivity.index).toBe(1)
    })
    
    it("збільшує індекс кадрів і обнуляє його після досягнення максимального значення", () => {
        // Мокуємо необхідні методи
        activityInstance.save = mock(() => {})
        
        // Встановлюємо початковий індекс
        activityInstance.index = 0
        activityInstance.render()
        expect(activityInstance.index).toBe(1)
        
        // Встановлюємо максимальний індекс (для dots це 9)
        activityInstance.index = 9
        activityInstance.render()
        expect(activityInstance.index).toBe(0) // Має обнулитися
    })
    
    it("викликає метод run і встановлює інтервал", () => {
        // Мокуємо метод process
        activityInstance.process = mock(() => {})
        
        // Мокуємо глобальні функції
        const originalSetInterval = global.setInterval
        const originalSetTimeout = global.setTimeout
        global.setInterval = mock((callback, delay) => {
            return 123 // Повертаємо будь-який ID інтервалу
        })
        global.setTimeout = mock((callback, delay) => {})
        
        activityInstance.run("Тестування")
        
        // Перевірки
        expect(global.setInterval).toHaveBeenCalled()
        expect(activityInstance.interval).toBe(123)
        
        // Тест з таймаутом
        activityInstance.stop = mock(() => {})
        activityInstance.run("Тестування", 1000)
        expect(global.setTimeout).toHaveBeenCalled()
        
        // Відновлюємо оригінальні функції
        global.setInterval = originalSetInterval
        global.setTimeout = originalSetTimeout
    })
    
    it("викликає метод stop і очищає інтервал", () => {
        // Мокуємо глобальні функції
        const originalClearInterval = global.clearInterval
        global.clearInterval = mock(() => {})
        
        // Мокуємо Cursor.show
        const originalCursorShow = Cursor.show
        Cursor.show = mock(() => {})
        
        // Мокуємо completeMessage
        activityInstance.completeMessage = mock(() => {})
        
        // Встановлюємо фіктивний інтервал
        activityInstance.interval = 123
        
        activityInstance.stop("Завершено")
        
        // Перевірки
        expect(global.clearInterval).toHaveBeenCalledWith([123])
        expect(activityInstance.interval).toBeNull()
        expect(Cursor.show).toHaveBeenCalled()
        expect(activityInstance.completeMessage).toHaveBeenCalledWith(["Завершено"])
        
        // Відновлюємо оригінальні функції
        global.clearInterval = originalClearInterval
        Cursor.show = originalCursorShow
    })
})

describe("activity factory function", () => {
    it("повертає новий екземпляр Activity", () => {
        const result = activity()
        expect(result).toBeInstanceOf(Activity)
    })
    
    it("передає опції до конструктора Activity", () => {
        const options = {
            type: "earth",
            color: "red",
            message: "Тестова активність"
        }
        
        const result = activity(options)
        
        expect(result.options.type).toBe("earth")
        expect(result.options.color).toBe("red")
        expect(result.options.message).toBe("Тестова активність")
    })
})
