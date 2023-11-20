import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateMeeting from './CreateMeeting';
import {MEETING_FIELDS} from "../../common/fields.jsx";
import {checkTextForProfanity} from "../../common/profanity.jsx";


// Mock necessary dependencies or context values
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../common/profanity.jsx'); // Automatically mocks the entire module


// Mock the fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 201,
    })
);

jest.spyOn(React, 'useContext').mockImplementation(() => ({
    user: {
        id: 123,
        token: 'mockToken',
    }
}));

describe('Is start time field rendered', () => {
    beforeEach(() => {
        // Clear fetch mocks before each test
        global.fetch.mockClear();
    });
    it('renders the component', () => {
        const navigate = jest.fn(); // Mock the navigate function
        require('react-router-dom').useNavigate.mockImplementation(() => navigate);
        render(<CreateMeeting />);
        // Add more specific assertions if needed
        expect(screen.getByText('Start time')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
        const navigate = jest.fn(); // Mock the navigate function
        require('react-router-dom').useNavigate.mockImplementation(() => navigate);
        const {getByTestId} = render(<CreateMeeting />);

        checkTextForProfanity.mockReturnValue( false);
        MEETING_FIELDS.forEach((mf) => {
            fireEvent.change(getByTestId(mf.name), { target: { value: 'test' } });
        });
        fireEvent.click(screen.getByText('Submit'));

        // Wait for the fetch to be called
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalled();
        });

    });

    it('handles profanity check', async () => {
        const navigate = jest.fn(); // Mock the navigate function
        require('react-router-dom').useNavigate.mockImplementation(() => navigate);

        checkTextForProfanity.mockReturnValue(true);

        const {getByText} = render(<CreateMeeting />);
        fireEvent.click(screen.getByText('Submit'));

        // Ensure that postMeeting is not called when profanity is detected
        await waitFor(() => {
            expect(global.fetch).not.toHaveBeenCalled();
        });

    });
});
