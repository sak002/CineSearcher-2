import { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <Input
      placeholder="Search movies"
      prefix={<Search />}
      type="search"
      value={searchKey}
      onChange={event => setSearchKey(event.target.value)}
    />
  );
};

export default SearchBox;
