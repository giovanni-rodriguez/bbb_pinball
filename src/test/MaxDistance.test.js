import React from 'react'

import { render, fireEvent, screen } from "@testing-library/react";
import MaxDistance from '../components/MaxDistance';

describe("MaxDistance Component", () => {
    test("it should updated max distance when the value is changed", () => {
        const handleMaxDistanceChange = jest.fn();
        render(<MaxDistance handleMaxDistanceChange={handleMaxDistanceChange} />)

        const input = screen.getByLabelText("Maximum Distance(miles):");
        fireEvent.change(input, { target: { value: "100" } });

        expect(handleMaxDistanceChange).toHaveBeenCalledWith("100");
        expect(input.value).toBe('100');
    })

    test("renders with default max distance of 50", () => {
        const handleMaxDistanceChange = jest.fn();
        render(<MaxDistance handleMaxDistanceChange={handleMaxDistanceChange} />)
        const input = screen.getByLabelText("Maximum Distance(miles):");
        expect(input.value).toBe("50")
    })

    test("it should throw an error if invalid max distance is entered", () => {
        const handleMaxDistanceChange = jest.fn();
        render(<MaxDistance handleMaxDistanceChange={handleMaxDistanceChange} />)

        const input = screen.getByLabelText("Maximum Distance(miles):");
        fireEvent.change(input, { target: { value: "100" } });

        expect(handleMaxDistanceChange).toHaveBeenCalledWith("100");
        expect(input.value).toBe('100');
    })
})