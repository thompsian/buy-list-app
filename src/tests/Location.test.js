import React from 'react';
import { render, screen } from '@testing-library/react';
import Location from '../components/Location';
import {LocationContext} from '../contexts/locationContext'

describe('Location Component', () => {
    test('should contain the text shopping locations', () => {
        render(<LocationContext.Provider value={0}>
            <Location />
        </LocationContext.Provider>);

        const titleName = screen.getByText(/shopping locations/i);
        expect(titleName).toBeInTheDocument();
    });
});
