declare module '@olton/terminal' {
    /**
     * options for term
     */
    export interface TermOptions {
        style?: string | string[];
        color?: string | string[];
        gradient?: string | string[];
        [key: string]: any;
    }

    /**
     * Terminal class for creating styled text
     * Used by term function
     */
    export class Term {
        text: string;
        options: TermOptions;

        constructor(text?: string, options?: TermOptions);
        toString(): string;
    }

    /**
     * Functions for controlling terminal screen
     */
    export interface ScreenInterface {
        /**
         * Clears the screen
         */
        clear(): void;
        /**
         * Clears the current line
         */
        clearLine(): void;
        /**
         * Clears the current line to the end
         */
        clearRight(): void;
        /**
         * Clears the line to the beginning
         */
        clearLeft(): void;
        /**
         * Clears the screen to the end
         */
        clearDown(): void;
        /**
         * Clears the screen to the beginning
         */
        clearUp(): void;
        /**
         * Get screen size
         * @returns { x: number, y: number }
         */
        size(): { x: number; y: number };
    }

    /**
     * Functions for controlling cursor
     */
    export interface CursorInterface {
        /**
         * Moves the cursor to the beginning of the line
         */
        home(): void;
        /**
         * Moves the cursor to the specified position
         * @param x - The x coordinate
         * @param y - The y coordinate
         */
        to(x: number, y: number): void;
        /**
         * Moves the cursor up on n lines
         * @param n - The x coordinate
         */
        up(n?: number): void;
        /**
         * Moves the cursor down on n lines
         * @param n - The x coordinate
         */
        down(n?: number): void;
        /**
         * Moves the cursor right on n columns
         * @param n - The x coordinate
         */
        right(n?: number): void;
        /**
         * Moves the cursor left on n columns
         * @param n - The x coordinate
         */
        left(n?: number): void;
        /**
         * Moves cursor one line up, scrolling if needed
         */
        lineUp(): void;
        /**
         * Moves cursor to the beginning of the previous line, # lines up
         * @param n - The number of lines to move up
         */
        linesUp(n: number): void;
        /**
         * Moves cursor to the beginning of the next line, # lines down
         * @param n - The number of lines to move down
         */
        linesDown(n: number): void;
        /**
         * Request cursor position
         */
        getPos(): Promise<{x?: number, y?: number}>;
        /**
         * Save cursor position (DEC)
         */
        save(): string;
        /**
         * Restore cursor position (DEC)
         */
        restore(): string;
        /**
         * Hide cursor
         */
        hide(): string;
        /**
         * Show cursor
         */
        show(): string;
    }

    /**
     * Function to create styled text
     * @param text
     * @param options {TermOptions}
     */
    export function term(text: string, options?: TermOptions): Term;

    /**
     * Functions for controlling terminal screen
     */
    export const Screen: ScreenInterface;
    /**
     * Functions for controlling cursor
     */
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

    /**
     * Function for creating styled text with chaining interface
     */
    export interface StyleBuilder {
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

    export function createStyleBuilder(
        initialStyles?: StyleName[],
        initialColors?: [string, string] | string[] | number[],
        initialGradientColors?: string[]
    ): StyleBuilder;

    /**
     * Function for creating styled text with chaining interface
     */
    export const termx: StyleBuilder;
}