import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
    const title = 'Test Title';

    test('should render the title correcly', () => {
        render(<CustomHeader title={title} description="" />);
        const titleElement = screen.getByText(title);
        expect(titleElement).toBeDefined();
    });

    test('should render the description when provided', () => {
        const description = 'Test Description';
        render(<CustomHeader title={title} description={description} />);
        const descriptionElement = screen.getByText(description);
        expect(descriptionElement).toBeDefined();
    });

    test('should not render description when not provided', () => {
        render(<CustomHeader title={title} description="" />);
        const descriptionElement = screen.queryByRole('paragraph');
        expect(descriptionElement).toBeNull();
    });
});
