import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { searchField } from "../reducers/productsReducer";

const SearchPanel = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchField(query.toLowerCase()));
  }, [query]);

  return (
    <input
      type="text"
      placeholder="Введите название товара для поиска"
      className="w-50 form-control"
      value={query}
      onChange={(event) => {
        setQuery(event.target.value);
      }}
    />
  );
};

export default SearchPanel;
