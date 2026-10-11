import type * as NumberToWords from '../../src/index';

declare global {
    interface Window {
        numberToWords?: typeof NumberToWords;
    }
}

// Runs a bundle like a plain <script> tag would, which must define the global `numberToWords`
export function loadScript(code: string): typeof NumberToWords {
    delete window.numberToWords;

    const script = document.createElement('script');
    script.textContent = code;
    document.head.appendChild(script);
    script.remove();

    if (!window.numberToWords) {
        throw new Error('The bundle did not define a global numberToWords');
    }
    return window.numberToWords;
}
