import { render, screen } from "@testing-library/react";
import Footer from "./index";

test("Renderizar o footer", async () => {
  render(<Footer />);
  
  expect(screen.getByText("Andrey Mazépas")).not.toBeNull();
});
