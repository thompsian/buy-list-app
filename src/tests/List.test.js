import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import List from '../pages/List';

describe('List Page', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<List />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});