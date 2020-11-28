import CharactersListing from "../CharactersListing";
import Header from "../Header";
import Footer from '../Footer';
import "./App.scss";

// Um wrapper para todos os componentes da tela.
function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <div className="App-content">
          <CharactersListing />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
