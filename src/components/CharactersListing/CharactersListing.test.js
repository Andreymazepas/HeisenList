import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharactersListing from "./index";
import { rest } from "msw";
import { setupServer } from "msw/node";

const mockCharacter = [
  {
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
  },
];

const mockCharacters = [
  {
    char_id: 1,
    name: "Walter White",
    birthday: "09-07-1958",
    occupation: ["High School Chemistry Teacher", "Meth King Pin"],
    img:
      "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
    status: "Presumed dead",
    nickname: "Heisenberg",
    appearance: [1, 2, 3, 4, 5],
    portrayed: "Bryan Cranston",
    category: "Breaking Bad",
    better_call_saul_appearance: [],
  },
  {
    char_id: 2,
    name: "Jesse Pinkman",
    birthday: "09-24-1984",
    occupation: ["Meth Dealer"],
    img:
      "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441",
    status: "Alive",
    nickname: "Cap n' Cook",
    appearance: [1, 2, 3, 4, 5],
    portrayed: "Aaron Paul",
    category: "Breaking Bad",
    better_call_saul_appearance: [],
  },
];

const server = setupServer(
  rest.get(
    "https://www.breakingbadapi.com/api/characters/?name=Tortuga&limit=10&offset=0",
    (req, res, ctx) => {
      return res(ctx.json(mockCharacter));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Pesquisa por nome retorna o personagem correto", async () => {
  render(<CharactersListing />);
  await act(async () => {
    userEvent.type(
      screen.getByPlaceholderText("Type a character's name"),
      "Tortuga"
    );
    userEvent.click(screen.getByTestId("searchbar-button"));
  });
  await waitFor(() => screen.findByTestId("characterListing"));

  expect(screen.getByText("Danny Trejo")).not.toBeNull();
});

test("Filtro por personagens mortos ou vivos", async () => {
  server.use(
    rest.get(
      "https://www.breakingbadapi.com/api/characters?name=&limit=10&offset=0",
      (req, res, ctx) => {
        return res(ctx.json(mockCharacters));
      }
    )
  );

  const { queryByText } = render(<CharactersListing />);
  await act(async () => {
    userEvent.selectOptions(screen.getByTestId("filterSelect"), "Deceased");
  });
  await waitFor(() => screen.findByTestId("characterListing"));

  expect(queryByText("Jesse Pinkman")).toBeNull();

  await act(async () => {
    userEvent.selectOptions(screen.getByTestId("filterSelect"), "Alive");
  });
  await waitFor(() => screen.findByTestId("characterListing"));

  expect(queryByText("Walter White")).toBeNull();
});
