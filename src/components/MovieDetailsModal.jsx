import React, { useEffect, useState } from "react";

import { Modal, Typography } from "antd";
import axios from "axios";

import PageLoader from "./PageLoader";

const MovieDetailsModal = ({ visible, onClose, movie }) => {
  console.log(`Visibility: ${visible}`);
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovieData = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=eb23a269`
      );
    } catch {
      console.log("could not fetch movieData");
    } finally {
      setIsLoading(false);
    }
    setMovieData(response.data);
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Modal footer={null} visible={visible} zIndex={1000} onCancel={onClose}>
      <Typography className="text-lg">
        <strong>{movieData.Title}</strong>
      </Typography>
      <Typography className="mb-4">{movieData.Genre}</Typography>
      <div className="flex space-x-4">
        <img
          alt={movie?.Title}
          className="rounded-md"
          src={movie?.Poster}
          style={{ width: "40%" }}
        />
        <div>
          <Typography>{movieData.Plot}</Typography>
          <Typography>
            <strong>Director: </strong>
            {movieData.Director}
          </Typography>
          <Typography>
            <strong>Actors: </strong>
            {movieData.Actors}
          </Typography>
          <Typography>
            <strong>Box Office: </strong>
            {movieData.BoxOffice}
          </Typography>
          <Typography>
            <strong>Year: </strong>
            {movieData.Year}
          </Typography>
          <Typography>
            <strong>Runtime: </strong>
            {movieData.Runtime}
          </Typography>
          <Typography>
            <strong>Language: </strong>
            {movieData.Language}
          </Typography>
          <Typography>
            <strong>Rated: </strong>
            {movieData.Rated}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailsModal;
