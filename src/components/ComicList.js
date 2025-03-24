import React, { useState, useEffect } from 'react';
import {
  Container,
  Table} from 'react-bootstrap';
import { useComics } from '../contexts/ComicContext';

function ComicList({ paginatedComics }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Ranking</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Genre</th>
          <th>Chapters</th>
          <th>Review Comment</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {paginatedComics.length > 0 ? (
          paginatedComics.map((comic) => (
            <tr key={comic.id}>
              <td>{comic.ranking}</td>
              <td>{comic.title}</td>
              <td>{comic.author}</td>
              <td>{comic.publisher}</td>
              <td>{comic.genre}</td>
              <td>{comic.chapters}</td>
              <td>{comic.reviewComment}</td>
              <td>{comic.rating}/5</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No comics found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default ComicList;