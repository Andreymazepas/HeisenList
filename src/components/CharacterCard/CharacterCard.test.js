import { render, screen } from "@testing-library/react";
import CharacterCard from "./index";

const mockCharacter = {
  char_id: 48,
  name: "Tortuga",
  birthday: "Unknown",
  occupation: ["Juarez Cartel member", "DEA informant"],
  img:
    "https://vignette.wikia.nocookie.net/breakingbad/images/5/58/BBWA_Tortuga.jpg/revision/latest?cb=20131101172007",
  status: "Deceased",
  nickname: "Tortuga",
  appearance: [2, 3],
  portrayed: "Danny Trejo",
  category: "Breaking Bad",
  better_call_saul_appearance: [],
};

test("Renderizar o card com os atributos passados", async () => {
  render(<CharacterCard character={mockCharacter} />);

  expect(screen.getAllByText("Tortuga")).not.toBeNull();
  expect(screen.getByText("Danny Trejo")).not.toBeNull();
  expect(screen.getByText("Deceased")).not.toBeNull();
  expect(
    screen.getByText("Juarez Cartel member, DEA informant")
  ).not.toBeNull();
});
