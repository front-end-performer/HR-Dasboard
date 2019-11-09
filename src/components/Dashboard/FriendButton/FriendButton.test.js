import React from 'react';
import FriendButton from "./FriendButton";
import { render, waitForElement, fireEvent } from '@testing-library/react';
import axios from "../../../axios";

jest.mock('../../../axios');

test('state of the button before axios.get request', () => {

    const { container } = render(<FriendButton />);
    
    expect(
        container.querySelector('.btn').innerHTML).toBe("");
});