import React from 'react';
import { render, screen } from '@testing-library/react';
import AddItem from '../components/AddItem';
import {ItemContext} from '../contexts/itemContext'

describe('AddItem Component', () => {
    test('should render a title and a subtitle', () => {
        const contextValue = { addItemCount: () => {}};
        render(<ItemContext.Provider value={0}>
            <AddItem />
        </ItemContext.Provider>);

        const titleElements = screen.getAllByRole("heading");
        expect(titleElements.length).toBe(2);
    });
});
