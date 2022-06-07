import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter } from "react-router-dom"

const MockHeader = () => {
    return(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    )
}

describe('Footer Component', () => {
    test('should render 2 headers, title and subtitle', () => {
        render(<MockHeader />)

        const titleElements = screen.getAllByRole("heading");
        expect(titleElements.length).toBe(2);
    });
});
