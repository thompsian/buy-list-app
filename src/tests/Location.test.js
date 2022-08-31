import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from '../components/Location';
import { DataContext } from '../contexts/dataContext'

describe('Location Component', () => {
    test('should contain the text shopping locations', () => {
        render(<DataContext.Provider value={0}>
            <Location />
        </DataContext.Provider>);

        const titleName = screen.getByText(/locations/i);
        expect(titleName).toBeInTheDocument();
    });
});
