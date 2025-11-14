import { describe, expect, test } from 'vitest';
import { GifsApp } from './GifsApp';
import { render } from '@testing-library/react';

describe('GifsApp', () => {
    test('should render correctly', () => {
        const { container } = render(<GifsApp />);
        expect(container).toMatchSnapshot();
    });
});
