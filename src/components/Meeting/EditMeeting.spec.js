import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EditMeeting from './EditMeeting';
import { UserContext } from '../../context/UserContext';
import {MEETING_FIELDS} from "../../common/fields.jsx";
import {hostUrl} from "../../utils/urls.js";
import { Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('@/common/profanity', () => ({
    checkTextForProfanity: jest.fn(() => false), // Assuming no profanity in the test case
}));

const mockUser = {
    user: {
        token: 'fake-token',
    },
};

describe('EditMeeting component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders EditMeeting component correctly', () => {
        render(
            <UserContext.Provider value={mockUser}>
                <EditMeeting />
            </UserContext.Provider>
        );
    });

    it('handles form submission correctly', async () => {
        delete window.location;
        window.location = { search: '?meetingId=fake-meeting-id' };

        const navigate = jest.fn(); // Mock the navigate function
        require('react-router-dom').useNavigate.mockImplementation(() => navigate);


        const { getByText, getByLabelText, getByTestId } = render(
            <UserContext.Provider value={mockUser}>
                <EditMeeting />
            </UserContext.Provider>
        );

        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 204,
            })
        );

        // Simulate user input
        MEETING_FIELDS.forEach((mf) => {
            fireEvent.change(getByTestId(mf.name), { target: { value: 'test' } });
        });

        // Trigger form submission
        fireEvent.submit(getByText('Submit'));

        // Wait for the fetch to be called
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(`${hostUrl}/meeting/fake-meeting-id`, {
                method: 'PUT',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer fake-token',
                },
            });
        });
    });
});
