import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import Main from '../pages/Main';

describe('Main Page', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Main />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});