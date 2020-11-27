import { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { motion, AnimatePresence } from 'framer-motion';
import api from "../../services/api";
import CharacterCard from "../CharacterCard";

function App() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [deadFilter, setDeadFilter] = useState(false);

  const fetchData = useCallback(async () => {
    const { data } = await api.getCharacters(offset);
    setCharacters((prevCharacters) => [...prevCharacters, ...data]);
    setOffset((prevOffset) => prevOffset + 10);
    setHasMore(data.length === 10);
  }, [setCharacters, setOffset, offset]);

  const filterDeceased = (char) => {
    return !deadFilter || char.status === "Deceased"
  }

  const animationSpring = {
    type:"spring",
    damping: 25,
    stiffness: 120,
  }
  const animationExit = {
    opacity: 0,
    transition: {
      duration: 0.4
    }
  }


  return (
    <div className="App">
      <input
        type="checkbox"
        checked={deadFilter}
        onChange={(e) => setDeadFilter(e.target.checked)}
      />
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchData}
          hasMore={hasMore}
          loader={<div>loading...</div>}
        >
          <AnimatePresence>

            {characters
              .filter(filterDeceased)
              .map((char) => (
                <motion.div
                  key={char.char_id}
                  layout
                  transition={animationSpring}
                  exit={animationExit}
                >
                <CharacterCard key={char.char_id} character={char} />
                </motion.div>
              ))}
          </AnimatePresence>

        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
