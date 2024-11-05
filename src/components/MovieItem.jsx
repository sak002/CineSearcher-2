import React from "react";

import { Image } from "antd";
import { Typography } from "neetoui";

const MovieItem = props => (
  <div className="bg-gray-250 container border-2 border-blue-700 shadow-lg">
    <Image
      alt="Movie poster"
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
