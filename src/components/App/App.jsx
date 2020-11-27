import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { motion, AnimatePresence } from 'framer-motion';
import api from "../../services/api";
import CharacterCard from "../CharacterCard";

function App() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [deadFilter, setDeadFilter] = useState(false);
  const [searchTextInput, setSearchTextInput] = useState('');
  const [searchText, setSearchText] = useState('');

  const fetchData = async (page = 1, ) => {
    console.log(page); // pages start at 1 according to infinite-scroller
    const { data } = await api.getCharacters((page-1)*10, searchText);
      setCharacters((prevCharacters) =>  page===1 ? data : [...prevCharacters, ...data]);
    setHasMore(data.length === 10);
    console.log("hasmore: " + hasMore);
  }

  const filterDeceased = (char) => {
    return !deadFilter || char.status.match(/^(Deceased|Presumed dead)$/)
  }

  useEffect(() => {
    setCharacters([]);
    fetchData(1);
  }, [searchText])

  const handleSearch = () => {
    setSearchText(searchTextInput);
  }


  const animationSpring = {
    type:"spring",
    damping: 25,
    stiffness: 120,
  }



  return (
    <div className="App">
      <input
        type="checkbox"
        checked={deadFilter}
        onChange={(e) => setDeadFilter(e.target.checked)}
      />
      <label>Show only deceased characters.</label>

      <input type="text" value={searchTextInput} onChange={e => setSearchTextInput(e.target.value)} />
      <button onClick={handleSearch} >
        GOOOOOO
      </button>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>

        <InfiniteScroll
          pageStart={0}
          loadMore={fetchData}
          hasMore={hasMore}
          loader={<div>loading...</div>}
          initialLoad={false}
        >

            {characters
              .filter(filterDeceased)
              .map((char) => (
                <motion.div
                  key={char.char_id}
                  layout
                  transition={animationSpring}
                >
                <CharacterCard key={char.char_id} character={char} />
                </motion.div>
              ))}

        </InfiniteScroll>

      </div>
    </div>
  );
}

export default App;
