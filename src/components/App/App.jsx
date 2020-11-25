import React, { useEffect, useState } from 'react';
import api from '../../services/api';


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
      {characters.map(char => 
        <div style={{width: '150px', height: '200px'}}>
          <img style={{width: '140px', height: '160px', objectFit: 'cover'}} src={char.img} alt="pfp" />
          {char.name}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
