import {Options} from 'src/models/options';
import { NUMBERS, LOWERCASE, UPPERERCASE, ASCII_SYMBOLS, SPACE } from './constants';

export default class Utils {
    static async generateOptionsRawSet(options: Options) {
        let rawCharset: string = '';
        if (options.numbers) {
            rawCharset += NUMBERS;
        }
        if (options.lowerCase) {
            rawCharset += LOWERCASE;
        }
        if (options.upercase) {
            rawCharset += UPPERERCASE;
        }
        if (options.ASCIISymbols) {
            rawCharset += ASCII_SYMBOLS;
        }
        if (options.space) {
            rawCharset += SPACE;
        }
        rawCharset.replace(/ /g, '\u00A0');
        return rawCharset;
    }

    static async generateOptionsSet(options: Options) {
        const charset = [];
        const rawCharset = await this.generateOptionsRawSet(options);
        for (let i = 0; rawCharset.length > i; i++) {
            const c = rawCharset.charCodeAt(i);
            if (0xD800 > c || c >= 0xE000) {  // Regular UTF-16 character
                const s = rawCharset.charAt(i);
                if (charset.indexOf(s) === -1) {
                    charset.push(s);
                }
                continue;
            }
            if (0xDC00 > c ? rawCharset.length > i + 1 : false) {  // High surrogate
                const d = rawCharset.charCodeAt(i + 1);
                if (d >= 0xDC00 ? 0xE000 > d : false) {  // Low surrogate
                    const s = rawCharset.substring(i, i + 2);
                    i++;
                    if (charset.indexOf(s) === -1) {
                        charset.push(s);
                    }
                    continue;
                }
            }
            throw new Error('Invalid UTF-16');
        }
        return charset;
    }

    static async randomIntMathRandom(n) {
        const x = Math.floor(Math.random() * n);
        if (0 > x || x >= n) {
            throw new Error('Arithmetic exception');
        }
        return x;
    }

    // randomIntBrowserCrypto(n) {
    //     if (cryptoObject == null) {
    //         return 0;
    //     }
    //     // Generate an unbiased sample
    //     const x = new Uint32Array(1);
    //     do cryptoObject.getRandomValues(x);
    //     while (x[0] - x[0] % n > 4294967296 - n);
    //     return x[0] % n;
    // }

    static async randomInt(n) {
        const x = await this.randomIntMathRandom(n);
        // x = (x + this.randomIntBrowserCrypto(n)) % n;
        return x;
    }

    static async generatePassword(options: Options) {
        let result = '';
        const charset = await this.generateOptionsSet(options);

        const length = options.length;
        if (length > 10000) {
            throw new Error('Password length too large');
        }

        for (let i = 0; length > i; i++) {
            const rand = await this.randomInt(charset.length);
            result += charset[rand];
        }
        return result;
    }
}
