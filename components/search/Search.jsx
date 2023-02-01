import React from "react";

const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="my-2">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        className="w-72 p-2 text-black rounded-md border outline-none border-gray-700"
      />
    </div>
  );
};

export default Search;
