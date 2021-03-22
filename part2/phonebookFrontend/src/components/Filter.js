import React from "react";

const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter shown with{" "}
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
};

export default Filter;
