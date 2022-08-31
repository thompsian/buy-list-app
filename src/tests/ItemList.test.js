import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemList from '../components/ItemList';
import { DataContext } from '../contexts/dataContext'

describe('ItemList Component', () => {
    test('should render a single list', () => {
        render(<DataContext.Provider value={0}>
            <ItemList />
        </DataContext.Provider>);

        const titleElements = screen.getAllByRole("list");
        expect(titleElements.length).toBe(1);
    });
});
