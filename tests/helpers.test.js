import repeat from '../src/helpers/repeat.js'
import { describe, expect, it } from '@olton/latte'

describe('Helpers functions', () => {
    it('repeat повертає пустий рядок, якщо кількість повторень 0', () => {
        const result = repeat('*', 0)
        expect(result).toBe('')
    })
    
    it('repeat повертає повторений символ правильну кількість разів', () => {
        const result = repeat('*', 5)
        expect(result).toBe('*****')
    })
    
    it('repeat працює з мультисимвольними рядками', () => {
        const result = repeat('abc', 3)
        expect(result).toBe('abcabcabc')
    })
    
    it('repeat повертає оригінальний рядок, якщо кількість повторень 1', () => {
        const result = repeat('test', 1)
        expect(result).toBe('test')
    })
})
