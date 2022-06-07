import React from 'react';
import { render, screen } from '@testing-library/react';
import ItemList from '../components/ItemList';
import {ItemContext} from '../contexts/itemContext'

describe('AddItem Component', () => {
    test('should render a single list', () => {
        render(<ItemContext.Provider value={0}>
            <ItemList />
        </ItemContext.Provider>);

        const titleElements = screen.getAllByRole("list");
        expect(titleElements.length).toBe(1);
    });
});
