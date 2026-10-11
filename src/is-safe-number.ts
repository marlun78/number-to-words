import { MAX_SAFE_INTEGER } from './max-safe-integer';

export function isSafeNumber(value: unknown): boolean {
    return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
}
