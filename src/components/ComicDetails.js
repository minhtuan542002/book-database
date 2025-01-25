import React from "react";
import { useParams } from "react-router-dom";

const ComicDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Comic Details</h1>
      <p>Viewing details for comic ID: {id}</p>
    </div>
  );
};

export default ComicDetail;
