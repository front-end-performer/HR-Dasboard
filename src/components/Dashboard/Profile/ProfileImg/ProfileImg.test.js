import  React from "react";
import ProfileImg from "./ProfileImg";
import { render, fireEvent } from '@testing-library/react';

test('renders img with src to url prop', () => { 
    const { container } = render(<ProfileImg imgUrl='/dog.png' />); // will have one dome node as an object which contains in component ProfileImg
    expect(
        container.querySelector('img').getAttribute('src')
    ).toBe('/dog.png');
});

test('renders img with src set to /default.jpg when no url prop is passed', () => { 
    const { container } = render(<ProfileImg />);
    expect(
        container.querySelector('img').getAttribute('src')
    ).toBe('assets/generic-user.png');
});

test('renders first and last props in alt attribute', () => { 
    const { container } = render(<ProfileImg firstName='x' lastName='y' />);
    expect(
        container.querySelector('img').getAttribute('alt')
    ).toBe('x y');
});

test('onClick() prop gets called when img is clicked', () => { 
    const mockOnClick = jest.fn();
    const { container } = render(<ProfileImg click={mockOnClick} />);
    
    // to trigger 3 clicks

    fireEvent.click(
        container.querySelector('img')
    );
    
    fireEvent.click(
        container.querySelector('img')
    );
    
    fireEvent.click(
        container.querySelector('img')
    );

    expect(
        mockOnClick.mock.calls.length
    ).toBe(3);
});

