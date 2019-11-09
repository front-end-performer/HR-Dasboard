import React from 'react';
import axios from '../../../../axios';
import { render, fireEvent } from '@testing-library/react';
import BioEditor from '../BioEditor/BioEditor';

jest.mock('../../../../axios');

test('When no bio is passed to it, an "Add" button is rendered', () => {

    const { container } = render(<BioEditor />);
    expect(
        container.querySelector('#add').innerHTML).toBe("add");
});

test('When a bio is passed to it, an "Edit" button is rendered', () => {

    const { container } = render(<BioEditor bio="bio" />);
    expect(
        container.querySelector('#edit').innerHTML).toBe("edit");
});

test('Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.', () => {

    const { container } = render(<BioEditor bio="bio" />);

    fireEvent.click(
        container.querySelector('#edit')
    );

    expect(
        container.querySelectorAll('#textarea').length
    ).toBe(1);

    expect(
        container.querySelectorAll('#save_btn').length
    ).toBe(1);
});

test('Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios', () => {
    
    axios.post.mockResolvedValue({
        bio: {
            textarea: 'textarea'
        }
    });
    
    const { container } = render(<BioEditor />);

    fireEvent.click(
        container.querySelector('a')
    );

    fireEvent.click(
        container.querySelector('#save_btn')
    );

    expect(axios.post).toHaveBeenCalledTimes(1);
});