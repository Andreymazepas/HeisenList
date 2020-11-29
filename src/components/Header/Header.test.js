import { render, screen } from "@testing-library/react";
import Header from "./index";

test("Renderizar o header", async () => {
  render(<Header />);
  
  expect(screen.getByText("HeisenList")).not.toBeNull();
});
