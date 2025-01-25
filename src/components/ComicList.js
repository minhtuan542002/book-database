import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ComicCard from './ComicCard';

function ComicList({ comics }) {
  return (
    <Row>
      {comics.map((comic) => (
        <Col key={comic.id} sm={12} md={6} lg={4} className="mb-4">
          <ComicCard comic={comic} />
        </Col>
      ))}
    </Row>
  );
}

export default ComicList;