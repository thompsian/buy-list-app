import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddItem from '../components/AddItem';
import { DataContext } from '../contexts/dataContext'

describe('AddItem Component', () => {
    test('should render a title and a subtitle', () => {
        render(<DataContext.Provider value={0}>
            <AddItem />
        </DataContext.Provider>);

        const titleElements = screen.getAllByRole("heading");
        expect(titleElements.length).toBe(2);
    });

    test('should render input box for item name', async () => {
        render(<DataContext.Provider value={0}>
            <AddItem />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter item name/i);
        expect(inputElement).toBeInTheDocument;
    });

    test('should render input box for item category', async () => {
        render(<DataContext.Provider value={0}>
            <AddItem />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter item category/i);
        expect(inputElement).toBeInTheDocument;
    });

    test('should be able to type in input box for item name', async () => {
        render(<DataContext.Provider value={0}>
            <AddItem />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter item name/i);
        fireEvent.change(inputElement, { target: {value: "Name 1"} });
        expect(inputElement.value).toBe("Name 1");
    });

    test('should be able to type in input box for item category', async () => {
        render(<DataContext.Provider value={0}>
            <AddItem />
        </DataContext.Provider>);

        const inputElement = screen.getByPlaceholderText(/enter item category/i);
        fireEvent.change(inputElement, { target: {value: "Category 1"} });
        expect(inputElement.value).toBe("Category 1");
    });
});
