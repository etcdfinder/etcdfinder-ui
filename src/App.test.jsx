import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import * as client from './api/client';

// Mock the API client
vi.mock('./api/client', () => ({
    searchKeys: vi.fn(),
    getKey: vi.fn(),
    putKey: vi.fn(),
    deleteKey: vi.fn(),
}));

describe('App', () => {
    it('renders Key Store title', async () => {
        client.searchKeys.mockResolvedValue({ keys: [] });
        render(<App />);
        expect(await screen.findByText('Key Store')).toBeDefined();
    });
});
