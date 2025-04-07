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
}