import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import CharacterCard from '../CharacterCard';


function App() {
const [characters, setCharacters] = useState([]);

useEffect(() => {
  api.getCharacters()
    .then(response => {
      setCharacters(response.data)
    })
  
}, [])
  return (
    <div className="App">
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      {characters.map(char => (
        <React.Fragment key={char.char_id}>
          <CharacterCard character={char} />
        </ React.Fragment>
      ))}
      </div>
    </div>
  );
}

export default App;
