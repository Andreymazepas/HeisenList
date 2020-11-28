import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = ({ placeholder, handleSearch }) => {
  const [inputText, setInputText] = useState("");
  return (
    <div className="searchbar-wrap">
      <input
        type="text"
        class="searchbar-input"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button class="searchbar-button" onClick={() => handleSearch(inputText)}>
        <FaSearch />
      </button>
    </div>
  );
};
export default SearchBar;
