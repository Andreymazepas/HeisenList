import { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";
import api from "../../services/api";
import CharacterCard from "../CharacterCard";

function App() {
  const [characters, setCharacters] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    const { data } = await api.getCharacters(offset);
    setCharacters((prevCharacters) => [...prevCharacters, ...data]);
    setOffset((prevOffset) => prevOffset + 10);
    setHasMore(data.length === 10);
  }, [setCharacters, setOffset, offset]);

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchData}
          hasMore={hasMore}
          loader={<div>loading...</div>}
        >
          {characters.map((char) => (
            <CharacterCard key={char.char_id} character={char} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
