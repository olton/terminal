declare module '@olton/terminal' {
    // Опції для Terminal
    export interface TerminalOptions {
        style?: string | string[];
        color?: string | string[];
        gradient?: string | string[];
        [key: string]: any;
    }

    // Клас Terminal
    export class Terminal {
        text: string;
        options: TerminalOptions;

        constructor(text?: string, options?: TerminalOptions);
        toString(): string;
    }

    // Клас Screen
    export interface ScreenInterface {
        clear(): void;
        clearLine(): void;
        clearLineToRight(): void;
        clearLineToLeft(): void;
        clearToBottom(): void;
        clearToTop(): void;
    }

    // Клас Cursor
    export interface CursorInterface {
        up(n?: number): string;
        down(n?: number): string;
        right(n?: number): string;
        left(n?: number): string;
        nextLine(n?: number): string;
        prevLine(n?: number): string;
        column(n?: number): string;
        position(x?: number, y?: number): string;
        save(): string;
        restore(): string;
        hide(): string;
        show(): string;
    }

    // Утиліти та функції
    export function term(text: string, options?: TerminalOptions): string;
    
    // Статичні класи
    export const Screen: ScreenInterface;
    export const Cursor: CursorInterface;

    // Константи
    export const ESC: string;
    export const CSI: string;
    export const OSC: string;
    export const DCS: string;
    export const BEL: string;
    export const BS: string;
    export const HT: string;
    export const LF: string;
    export const VT: string;
    export const FF: string;
    export const NP: string;
    export const CR: string;
    export const DEL: string;

    interface StyleBuilder {
        // Основний метод для виведення стилізованого тексту
        write(text: string): string;

        // Методи для різних контекстів повідомлень
        error(text: string): string;
        warning(text: string): string;
        info(text: string): string;
        success(text: string): string;

        // Методи для різних тем
        sunset(text: string): string;
        ocean(text: string): string;
        matrix(text: string): string;
        dark(text: string): string;
        light(text: string): string;

        // Динамічні властивості для стилів
        // Базові стилі
        bold: StyleBuilder;
        italic: StyleBuilder;
        underline: StyleBuilder;
        inverse: StyleBuilder;
        strikethrough: StyleBuilder;

        // Динамічні властивості для кольорів тексту
        black: StyleBuilder;
        red: StyleBuilder;
        green: StyleBuilder;
        yellow: StyleBuilder;
        blue: StyleBuilder;
        magenta: StyleBuilder;
        cyan: StyleBuilder;
        white: StyleBuilder;
        gray: StyleBuilder;
        grey: StyleBuilder;

        brightRed: StyleBuilder;
        brightGreen: StyleBuilder;
        brightYellow: StyleBuilder;
        brightBlue: StyleBuilder;
        brightMagenta: StyleBuilder;
        brightCyan: StyleBuilder;
        brightWhite: StyleBuilder;

        // Фонові кольори
        bgBlack: StyleBuilder;
        bgRed: StyleBuilder;
        bgGreen: StyleBuilder;
        bgYellow: StyleBuilder;
        bgBlue: StyleBuilder;
        bgMagenta: StyleBuilder;
        bgCyan: StyleBuilder;
        bgWhite: StyleBuilder;
        bgGray: StyleBuilder;
        bgGrey: StyleBuilder;

        bgBrightRed: StyleBuilder;
        bgBrightGreen: StyleBuilder;
        bgBrightYellow: StyleBuilder;
        bgBrightBlue: StyleBuilder;
        bgBrightMagenta: StyleBuilder;
        bgBrightCyan: StyleBuilder;
        bgBrightWhite: StyleBuilder;

        // Градієнт
        gradient(...colors: string[]): StyleBuilder;

        // Додаткові властивості/методи можна додати відповідно до вашої реалізації
        [key: string]: any;
    }

    export type StyleName = 'bold' | 'italic' | 'underline' | 'inverse' | 'strike' | string;

    function createStyleBuilder(
        initialStyles?: StyleName[],
        initialColors?: [string, string] | string[] | number[],
        initialGradientColors?: string[]
    ): StyleBuilder;

    export const termx: StyleBuilder;

    export type { StyleBuilder };
}