import React, { useState, useEffect } from "react";

import axios from "axios";
import { Search } from "neetoicons";
import { Input, NoData, Typography } from "neetoui";
import { isEmpty } from "ramda";

import MovieDetailsModal from "./MovieDetailsModal";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [history, setHistory] = useState([]);

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

    if (response.data.totalResults && response.data.Search) {
      setData(response.data.Search);
      setTotalMovieCount(Number(response.data.totalResults));
    } else {
      setData([]);
      setTotalMovieCount(0);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchKey, currentPage]);

  const handleMovieClick = movie => {
    console.log("Movie clicked:", movie);
    setSelectedMovie(movie);
    setIsModalVisible(true);

    if (!history.includes(movie.Title)) {
      setHistory(prevHistory => [...prevHistory, movie.Title]);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    console.log("Modal visibility:", isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    console.log("Selected movie:", selectedMovie);
  }, [selectedMovie]);

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
            setCurrentPage(1);
          }}
        />
      </div>
      {isEmpty(data) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="flex">
          <div className="ml-20 mr-2 grid grid-cols-4 gap-x-4 gap-y-8 p-4 md:grid-cols-2 lg:grid-cols-4">
            {/* justify-items-center */}
            {data.map(movie => (
              <MovieItem
                key={movie.imdbID}
                {...movie}
                onClick={() => handleMovieClick(movie)}
              />
            ))}
          </div>
          <div className="mr-10 w-2/6 border-l border-green-900">
            <h1 className="mb-5 text-xl">
              <strong>View History</strong>
            </h1>
            {history.map((movieName, index) => (
              <Typography
                className="w-100 border-1 m-2 border-red-800 bg-gray-400 px-12 py-2"
                key={index}
              >
                {movieName}
              </Typography>
            ))}
          </div>
        </div>
      )}
      <Pagination
        countsPerPage={DEFAULT_PAGE_SIZE}
        setCurrentPage={setCurrentPage}
        totalCount={totalMovieCount}
      />
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          visible={isModalVisible}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MovieList;
