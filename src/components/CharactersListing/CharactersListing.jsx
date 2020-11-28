import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { motion } from "framer-motion";
import api from "../../services/api";
import CharacterCard from "../CharacterCard";
import SearchBar from "../SearchBar";
import "./CharactersListing.scss";

function CharactersListing() {
  const [characters, setCharacters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [deadFilter, setDeadFilter] = useState(false);
  const [searchTextInput, setSearchTextInput] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchData = async (page = 1) => {
    console.log(page); // pages start at 1 according to infinite-scroller
    const { data } = await api.getCharacters((page - 1) * 10, searchText);
    setCharacters((prevCharacters) =>
      page === 1 ? data : [...prevCharacters, ...data]
    );
    setHasMore(data.length === 10);
    console.log("hasmore: " + hasMore);
  };

  const filterDeceased = (char) => {
    return !deadFilter || char.status.match(/^(Deceased|Presumed dead)$/);
  };

  useEffect(() => {
    setCharacters([]);
    fetchData(1);
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const animationSpring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
  };

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
        loader={<div>loading...</div>}
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
