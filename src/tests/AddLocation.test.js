import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddLocation from '../components/AddLocation';
import { DataContext } from '../contexts/dataContext';

describe('AddLocation Component', () => {
    test('should contain the text add a new location', () => {
        render(<DataContext.Provider value={0}>
            <AddLocation />
        </DataContext.Provider>);

        const titleName = screen.getByText(/add a new location/i);
        expect(titleName).toBeInTheDocument();
    });

    test('should render input element', async () => {
        render(<DataContext.Provider value={0}>
            <AddLocation />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter location name/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('should be able to type into input', async () => {
        render(<DataContext.Provider value={0}>
            <AddLocation />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter location name/i);
        fireEvent.change(inputElement, { target: {value: "Location 1"} });
        expect(inputElement.value).toBe("Location 1");
    });

    test('should reset input box to empty after submit', async () => {
        render(<DataContext.Provider value={0}>
            <AddLocation />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter location name/i);
        const buttonElement = screen.getByRole("button");
        fireEvent.change(inputElement, { target: {value: "Location 1"} });
        fireEvent.click(buttonElement);
        expect(inputElement.value).toBe("Location 1");
    });
});
