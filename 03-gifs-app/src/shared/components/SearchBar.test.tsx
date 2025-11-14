import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBarTest', () => {
    test('should render SearchBar correctly', async () => {
        const { container } = render(
            <SearchBar onQuery={() => {}} placeHolder="Search" />
        );
        expect(container).toMatchSnapshot();
        expect(screen.getByPlaceholderText('Search')).toBeTruthy();
        expect(screen.getByRole('button')).toBeTruthy();
    });

    test('should call onQuery with the correct value after 700ms', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} placeHolder="Search" />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });
        expect(onQuery).not.toHaveBeenCalled();
        waitFor(
            () => {
                expect(onQuery).toHaveBeenCalledWith('test');
            },
            { timeout: 700 }
        );
    });

    test('should call only once with the last value (debounce)', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} placeHolder="Search" />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.change(input, { target: { value: 'test2' } });
        fireEvent.change(input, { target: { value: 'test3' } });

        expect(onQuery).not.toHaveBeenCalled();
        waitFor(
            () => {
                expect(onQuery).toHaveBeenCalledTimes(1);
                expect(onQuery).toHaveBeenCalledWith('test3');
            },
            { timeout: 700 }
        );
    });

    test('should call onQuery when button is clicked', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} placeHolder="Search" />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(button);
        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test');
    });
});
