declare module '@olton/terminal' {
    export type ColorName = 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | string;
    export type BrightColor = 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' | string;
    export type BgColorName = 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' | 'bgGray' | string;
    export type BrightBgColor = 'bgRedBright' | 'bgGreenBright' | 'bgYellowBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright' | string;
    export type Color = ColorName | BrightColor | BgColorName | BrightBgColor | string | number;
    export type Style = 'bold' | 'italic' | 'underline' | 'inverse' | 'strike' | string;

    /**
     * options for term
     */
    export interface TermOptions {
        style?: Style[];
        color?: Color[];
        gradient?: string[];
        [key: string]: any;
    }

    /**
     * Terminal class for creating styled text
     * Used by term function
     */
    export class Term {
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
        
        /**
         * Set cursor shape
         * @param shape - The shape of the cursor
         */
        shape: {
            /**
             * Set cursor shape to block
             * @param blink - If true, the cursor will blink
             */
            block(blink: boolean): void;
            /**
             * Set cursor shape to line
             * @param blink - If true, the cursor will blink
             */
            line(blink: boolean): void;
            /**
             * Set cursor shape to bar
             * @param blink - If true, the cursor will blink
             */
            bar(blink: boolean): void;
        }
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
    export const ST: string;

    /**
     * Function for creating styled text with chaining interface
     */
    export interface StyleBuilder {
        /**
         * Write styled text to the terminal
         * @param text
         */
        write(text: string): string;

        /**
         * Write error text to the terminal
         * @param text
         */
        error(text: string): string;
        /**
         * Write warning text to the terminal
         * @param text
         */
        warning(text: string): string;
        /**
         * Write info text to the terminal
         * @param text
         */        
        info(text: string): string;
        /**
         * Write success text to the terminal
         * @param text
         */
        success(text: string): string;

        /**
         * Set bold text
         */
        bold: StyleBuilder;
        /**
         * Set italic text
         */
        italic: StyleBuilder;
        /**
         * Set underline text
         */
        underline: StyleBuilder;
        /**
         * Set inverse text
         */
        inverse: StyleBuilder;
        /**
         * Set strikethrough text
         */
        strike: StyleBuilder;

        /**
         * Set black text
         */
        black: StyleBuilder;
        /**
         * Set red text
         */
        red: StyleBuilder;
        /**
         * Set green text
         */
        green: StyleBuilder;
        /**
         * Set yellow text
         */
        yellow: StyleBuilder;
        /**
         * Set blue text
         */
        blue: StyleBuilder;
        /**
         * Set magenta text
         */
        magenta: StyleBuilder;
        /**
         * Set cyan text
         */
        cyan: StyleBuilder;
        /**
         * Set white text
         */
        white: StyleBuilder;
        /**
         * Set gray text
         */
        gray: StyleBuilder;

        /**
         * Set bright red text
         */
        redBright: StyleBuilder;
        /**
         * Set bright green text
         */
        greenBright: StyleBuilder;
        /**
         * Set bright yellow text
         */
        yellowBright: StyleBuilder;
        /**
         * Set bright blue text
         */
        blueBright: StyleBuilder;
        /**
         * Set bright magenta text
         */
        magentaBright: StyleBuilder;
        /**
         * Set bright cyan text
         */
        cyanBright: StyleBuilder;
        /**
         * Set bright white text
         */
        whiteBright: StyleBuilder;

        /**
         * Set bg black text
         */
        bgBlack: StyleBuilder;
        /**
         * Set bg red text
         */
        bgRed: StyleBuilder;
        /**
         * Set bg green text
         */
        bgGreen: StyleBuilder;
        /**
         * Set bg yellow text
         */
        bgYellow: StyleBuilder;
        /**
         * Set bg blue text
         */
        bgBlue: StyleBuilder;
        /**
         * Set bg magenta text
         */
        bgMagenta: StyleBuilder;
        /**
         * Set bg cyan text
         */
        bgCyan: StyleBuilder;
        /**
         * Set bg white text
         */
        bgWhite: StyleBuilder;
        /**
         * Set bg gray text
         */
        bgGray: StyleBuilder;

        /**
         * Set bg bright red text
         */
        bgRedBright: StyleBuilder;
        /**
         * Set bg bright green text
         */
        bgGreenBright: StyleBuilder;
        /**
         * Set bg bright yellow text
         */
        bgYellowBright: StyleBuilder;
        /**
         * Set bg bright blue text
         */
        bgBlueBright: StyleBuilder;
        /**
         * Set bg bright magenta text
         */
        bgMagentaBright: StyleBuilder;
        /**
         * Set bg bright cyan text
         */
        bgCyanBright: StyleBuilder;
        /**
         * Set bg bright white text
         */
        bgWhiteBright: StyleBuilder;

        /**
         * Set gradient text color
         * @param colors
         */
        gradient(...colors: string[]): StyleBuilder;

        [key: string]: any;
    }
    
    export function createStyleBuilder(
        initialStyles?: Style[],
        initialColors?: Color[],
        initialGradientColors?: string[]
    ): StyleBuilder;

    /**
     * Function for creating styled text with chaining interface
     */
    export const termx: StyleBuilder;
    
    export interface Themes {
        currentTheme: { color: Color[], style: Style[] };
        
        /**
         * Set default color theme
         * @param name - The name of the theme
         */
        default: void;
        /**
         * Set sunset color theme
         * @param name - The name of the theme
         */
        sunset: void;
        /**
         * Set ocean color theme
         * @param name - The name of the theme
         */
        ocean: void;
        /**
         * Set forest color theme
         * @param name - The name of the theme
         */
        forest: void;
        /**
         * Set desert color theme
         * @param name - The name of the theme
         */
        desert: void;
        /**
         * Set twilight color theme
         * @param name - The name of the theme
         */
        twilight: void;
        /**
         * Set night color theme
         * @param name - The name of the theme
         */
        matrix: void;
        /**
         * Set error color theme
         * @param name - The name of the theme
         */
        error: void;
        /**
         * Set warning color theme
         * @param name - The name of the theme
         */
        warning: void;
        /**
         * Set info color theme
         * @param name - The name of the theme
         */
        info: void;
        /**
         * Set success color theme
         * @param name - The name of the theme
         */
        success: void;
        
        /**
         * Set custom color theme
         * @param name - The name of the theme
         * @param changeConsoleColor - Change console color
         */
        set(name: string, changeConsoleColor: boolean): void;
        /**
         * Reset color theme to default
         * @returns { name: string, changeConsoleColor: boolean }
         */
        reset(): void;
        /**
         * Add new color theme
         * @returns { name: string, changeConsoleColor: boolean }
         */
        add(name: string, {color, style}): void;
    }
}