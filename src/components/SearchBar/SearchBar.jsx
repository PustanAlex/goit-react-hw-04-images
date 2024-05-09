const SearchBar = ({ handleSubmit, handleSearchInput }) => {



  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  }
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span>Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          onChange={handleSearchInput}
        />
      </form>
    </header>
  );
};

export default SearchBar;
