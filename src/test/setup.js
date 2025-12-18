import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Polyfill for TextEncoder/TextDecoder which are required by jsdom in some environments
if (typeof globalThis.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = await import('node:util');
    globalThis.TextEncoder = TextEncoder;
    globalThis.TextDecoder = TextDecoder;
}

afterEach(() => {
    cleanup();
});
