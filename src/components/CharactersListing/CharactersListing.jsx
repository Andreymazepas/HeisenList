import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { motion } from "framer-motion";
import api from "../../services/api";
import CharacterCard from "../CharacterCard";
import SearchBar from "../SearchBar";
import "./CharactersListing.scss";
import { FaSpinner } from "react-icons/fa";

function CharactersListing() {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [deadFilter, setDeadFilter] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchData = useCallback(async (page = 1) => {
    // De acordo com o react-infinite-scroller, as paginas começam em 1
    const { data } = await api.getCharacters((page - 1) * 10, searchText);
    setCharacters((prevCharacters) =>
      page === 1 ? data : [...prevCharacters, ...data]
    );
    setHasMore(data.length === 10); // Receber menos de 10 implica que é o fim da lista
  }, [searchText]);

  const filterDeceased = (char) => {
    return !deadFilter || char.status.match(/^(Deceased|Presumed dead)$/);
  };

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

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
    <div className="loading">
      <FaSpinner className="loading-icon" size="2em"/>
      <p>Loading...</p>
    </div>
  )

  return (
    <div className="charactersListing">
      <div className="charactersListing-searchForm">
        <SearchBar
          placeholder="Type a character's name"
          handleSearch={handleSearch}
        />
        <input
          type="checkbox"
          checked={deadFilter}
          onChange={(e) => setDeadFilter(e.target.checked)}
        />
      <label>Show only deceased characters.</label>
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
