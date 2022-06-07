import React from 'react';
import { render, screen } from '@testing-library/react';
import AddLocation from '../components/AddLocation';
import {LocationContext} from '../contexts/locationContext'

describe('AddLocation Component', () => {
    test('should contain the text add a new location', () => {
        render(<LocationContext.Provider value={0}>
            <AddLocation />
        </LocationContext.Provider>);

        const titleName = screen.getByText(/add a new location/i);
        expect(titleName).toBeInTheDocument();
    });
});
