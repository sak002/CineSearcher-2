import React, { useState, useEffect } from "react";

import axios from "axios";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import MovieItem from "./MovieItem";
import PageLoader from "./PageLoader";
import Pagination from "./Pagination";
import useDebounce from "./useDebounce";

const MovieList = () => {
  const [data, setData] = useState([]);
  const [totalMovieCount, setTotalMovieCount] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchKey = useDebounce(searchKey);
  const DEFAULT_PAGE_SIZE = 10;
  // const DEFAULT_PAGE_INDEX = 1;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    setIsLoading(true);
    let response;
    try {
      console.log("Data fetch started.");
      if (debouncedSearchKey === "") {
        response = await axios.get(
          `http://www.omdbapi.com/?s=spider&apikey=eb23a269&page=${currentPage}`
        );
      } else {
        response = await axios.get(
          `http://www.omdbapi.com/?s=${debouncedSearchKey}&apikey=eb23a269&page=${currentPage}`
        );
      }

      console.log(response.data);
    } catch {
      console.log("Error occurred");
    } finally {
      console.log("Data fetched successfully.");
      setIsLoading(false);
    }

    // setData(response.Search);

    if (response.data.totalResults && response.data.Search) {
      setData(response.data.Search);
      setTotalMovieCount(Number(response.data.totalResults));
    } else {
      setData([]);
      setTotalMovieCount(0);
    }

    return;
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchKey, currentPage]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <div>
        <Input
          className="m-8"
          placeholder="Search movies"
          prefix={<Search />}
          type="search"
          value={searchKey}
          onChange={event => {
            setSearchKey(event.target.value);
            // setCurrentPage(DEFAULT_PAGE_INDEX);
          }}
        />
      </div>
      {isEmpty(data) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="mx-20 grid grid-cols-2 gap-x-24 gap-y-8 p-4 md:grid-cols-2 lg:grid-cols-5">
          {/* justify-items-center */}
          {data.map(movie => (
            <MovieItem key={movie.imdbID} {...movie} />
          ))}
        </div>
      )}
      <div>
        <Pagination
          countsPerPage={DEFAULT_PAGE_SIZE}
          setCurrentPage={setCurrentPage}
          totalCount={totalMovieCount}
        />
      </div>
    </div>
  );
};

export default MovieList;
