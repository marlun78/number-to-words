// Simplified https://gist.github.com/marlun78/885eb0021e980c6ce0fb
export function isFinite(value: unknown): value is number {
    return !(
        typeof value !== 'number' ||
        value !== value ||
        value === Infinity ||
        value === -Infinity
    );
}
