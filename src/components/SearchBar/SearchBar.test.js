import { render, getByPlaceholderText, fireEvent, screen } from "@testing-library/react";
import SearchBar from './index';

test("Chamar o handleSearch com o texto do input", async()=> {
    const handleSearchFn = jest.fn();
    render(<SearchBar handleSearch={handleSearchFn} placeholder="testInput"/>);

    const input = screen.getByPlaceholderText("testInput");
    fireEvent.change(input, { target: { value: "Tortuga"}});
    fireEvent.click(screen.getByTestId("searchbar-button"));
 
    expect(handleSearchFn).toHaveBeenCalled();
    expect(handleSearchFn).toHaveBeenLastCalledWith("Tortuga")
} )
