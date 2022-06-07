import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
    test('should render 1 h6 header', () => {
        render(<Footer />)

        const titleElements = screen.getAllByRole("heading");
        expect(titleElements.length).toBe(1);
    });
});
