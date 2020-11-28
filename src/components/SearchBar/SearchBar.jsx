import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = ({ placeholder, handleSearch }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      handleSearch(inputText);
  }

  return (
    <form onSubmit={handleSubmit} className="searchbar-wrap">
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="searchbar-button"
        type="submit"
      >
        <FaSearch />
      </button>
    </form>
  );
};
export default SearchBar;
