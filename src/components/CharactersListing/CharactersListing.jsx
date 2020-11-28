import { useState, useEffect, useCallback } from "react";
import { FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroller";
import api from "../../services/api";
import CharacterCard from "../CharacterCard";
import SearchBar from "../SearchBar";
import "./CharactersListing.scss";

function CharactersListing() {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState("");
  const [searchText, setSearchText] = useState("");

  // Faz a chamada da api, passando opcionalmente o nome para pesquisa
  const fetchData = useCallback(
    async (page = 1) => {
      // De acordo com o react-infinite-scroller, as paginas começam em 1
      const { data } = await api.getCharacters((page - 1) * 10, searchText);
      setCharacters((prevCharacters) =>
        page === 1 ? data : [...prevCharacters, ...data]
      );
      setHasMore(data.length === 10); // Receber menos de 10 implica que é o fim da lista
    },
    [searchText]
  );

  // Filtro local dos personagens
  const filterDeceased = (char) => {
    switch (filter) {
      case "All":
        return true;
      case "Deceased":
        return char.status.match(/^(Deceased|Presumed dead)$/);
      case "Alive":
        return char.status.match(/^(Alive)$/);
      default:
        return true;
    }
  };

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // Reseta a lista de personagens e realiza a pesquisa com o texto atualizado
  const handleSearch = (text) => {
    setSearchText(text);
    setCharacters([]);
    fetchData(1);
  };

  const animationSpring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };

  const loading = (
    <div key={0} className="loading">
      <FaSpinner className="loading-icon" size="2em" />
      <p>Loading...</p>
    </div>
  );

  return (
    <div className="charactersListing">
      <div className="charactersListing-searchForm">
        <SearchBar
          placeholder="Type a character's name"
          handleSearch={handleSearch}
        />
        <label htmlFor="filterSelect">Show: </label>
        <select
          name="filterSelect"
          value={filter}
          onChange={(e) => setFilter(e.currentTarget.value)}
        >
          <option value="All">All characters</option>
          <option value="Alive">Alive characters only</option>
          <option value="Deceased">Dead characters only</option>
        </select>
      </div>

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchData}
        hasMore={hasMore}
        loader={loading}
        initialLoad={false}
      >
        <div className="charactersListing-cards">
          {characters.filter(filterDeceased).map((char) => (
            <motion.div
              className="charactersListing-cardContainer"
              key={char.char_id}
              layout
              transition={animationSpring}
            >
              <CharacterCard key={char.char_id} character={char} />
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default CharactersListing;
