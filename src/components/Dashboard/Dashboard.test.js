import React from 'react';
import Dashboard from "./Dashboard";
import { render, waitForElement } from '@testing-library/react';
import axios from "../../axios";

//automatic mock -  sets jest to mock axios for me
// created dumb copys of th methods
// the methoda of axios i need are "get" or "post"

jest.mock('../../axios');

test('app/dashboard shows nothign at first', async () => {
    axios.get.mockResolvedValue({
        data: {
            first: 'firstname',
            last: 'lastName',
            imgurl: 'dog.png',
            bio: 'bio',
            id: 1
        }
    });
    const { container } = render(<Dashboard />);

    // this is how we check if NOTHING has been rendered
    expect(
        container.children.length
    ).toBe(0);

    await waitForElement(() => container.querySelector('div'));

    expect(
        container.children.length
    ).toBe(1);
});