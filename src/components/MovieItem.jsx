import React from "react";

import { Image } from "antd";
import { Typography } from "neetoui";

const MovieItem = props => (
  <div
    className="bg-gray-250 container border-2 border-blue-700 shadow-lg"
    onClick={() => props.onClick(props)}
  >
    <Image
      alt={props.Title}
      className="mx-auto mt-1 h-60 w-40 border-2 border-blue-700"
      src={props.Poster}
    />
    <div className="mx-2 mb-10 mt-2 border-2 border-purple-700">
      <Typography className="text-left">{props.Title}</Typography>
      <Typography className="text-left">
        {props.Type} - {props.Year}
      </Typography>
    </div>
  </div>
);

export default MovieItem;

// import React from "react";

// import { Card } from "antd";

// const MovieItem = ({ movie, onClick }) => (
//   <Card
//     hoverable
//     cover={<img alt={movie.Title} src={movie.Poster} />}
//     style={{ width: 240 }}
//     onClick={() => onClick(movie)} // Pass the movie data to the onClick handler
//   >
//     <Card.Meta description={movie.Year} title={movie.Title} />
//   </Card>
// );

// export default MovieItem;
