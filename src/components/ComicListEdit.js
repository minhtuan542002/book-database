import React from 'react';
import {Table} from 'react-bootstrap';

function ComicListEdit({paginatedComics, onClick}) {
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
        {paginatedComics.map((comic) => (
            <tr 
            key={comic.id} 
            onDoubleClick={() => onClick(comic)}
            style={{ cursor: 'pointer' }}
            >
            <td>{comic.ranking}</td>
            <td>{comic.title}</td>
            <td>{comic.author}</td>
            <td>{comic.publisher}</td>
            <td>{comic.genre}</td>
            <td>{comic.chapters}</td>
            <td>{comic.reviewComment}</td>
            <td>{comic.rating}/5</td>
            </tr>
        ))}
        </tbody>
    </Table>
  );
}

export default ComicListEdit;