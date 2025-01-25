import React from 'react';
import Card from 'react-bootstrap/Card';

function ComicCard({ comic }) {
  return (
    <Card>
      <Card.Img variant="top" src={comic.image_url} alt={comic.title} />
      <Card.Body>
        <Card.Title>{comic.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {comic.author}
        </Card.Text>
        <Card.Text>
          <strong>Publisher:</strong> {comic.publisher}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ComicCard;