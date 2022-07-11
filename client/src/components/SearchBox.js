import React from "react";

const SearchBox = ({ searchfield, searchChange }, ref) => {
  return (
    <div className="pa2">
      <input
        aria-label="Search"
        className="pa3 ba b--green bg-lightest-blue"
        ref={ref}
        type="search"
        placeholder="search robots"
        onChange={searchChange}
      />
    </div>
  );
};

const forwardSRef = React.forwardRef(SearchBox);
export { forwardSRef as SearchBox };
