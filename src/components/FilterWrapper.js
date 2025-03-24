import React, { useState, useEffect } from 'react';
import ComicList from './ComicList';
import { useComics } from '../contexts/ComicContext';
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Offcanvas} from 'react-bootstrap';

function FilterWrapper({children}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublisher, setFilterPublisher] = useState('All');
  const [filterGenre, setFilterGenre] = useState('All');
  const [filterLength, setFilterLength] = useState('All');
  const [filterScore, setFilterScore] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filtersVisible, setFiltersVisible] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {comics, loading, error} = useComics();
  
  // Filter and sort comics
  const filteredComics = comics
    .filter((comic) => {
      const matchesSearch =
        comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comic.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPublisher = filterPublisher === 'All' || comic.publisher === filterPublisher;
      const matchesGenre =
        filterGenre === 'All' ||
        comic.genre
          .split(/[,/]/)
          .map((g) => g.trim().toLowerCase())
          .includes(filterGenre.toLowerCase());
      const matchesLength =
        filterLength === 'All' ||
        (filterLength === 'Short' && comic.chapters <= 20) ||
        (filterLength === 'Medium' && comic.chapters > 20 && comic.chapters <= 50) ||
        (filterLength === 'Long' && comic.chapters > 50);
      const matchesScore =
        filterScore === 'All' ||
        (filterScore === 'High' && comic.rating >= 4.5) ||
        (filterScore === 'Medium' && comic.rating >= 3 && comic.rating < 4.5) ||
        (filterScore === 'Low' && comic.rating < 3);

      return matchesSearch && matchesPublisher && matchesGenre && matchesLength && matchesScore;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortOrder === 'asc') return a[sortField] - b[sortField];
      return b[sortField] - a[sortField];
    });

  const totalPages = Math.ceil(filteredComics.length / itemsPerPage);
  const publishers = ['All', ...new Set(comics.map((comic) => comic.publisher))];
  const genres = [
    'All',
    ...Array.from(
      new Set(comics.flatMap((comic) => comic.genre.split(/[,/]/).map((g) => g.trim())))
    ),
  ];
  const paginatedComics = filteredComics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="mb-2">
        <Button
          variant="secondary"
          onClick={() => setFiltersVisible(true)}
          className="ms-auto"
        >
          Open Filters
        </Button>
      </div>
      
      {/* Loading Spinner  */}
      <div>
        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {/* Comic Table */}
        {!loading && !error && (
          <>
            {React.cloneElement(children, { paginatedComics })}

            {/* Pagination */}
            <div className="d-flex justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? 'secondary' : 'outline-secondary'}
                  className="mx-1"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Filter sidebar */}
      <Offcanvas show={filtersVisible} onHide={() => setFiltersVisible(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters & Sorting</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            {/* Search and Filter */}
            <Form.Group controlId="searchBar" className="mb-3">
              <Form.Label>Search by Title or Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="filterPublisher" className="mb-3">
              <Form.Label>Filter by Publisher</Form.Label>
              <Form.Select
                value={filterPublisher}
                onChange={(e) => {
                  setFilterPublisher(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {publishers.map((publisher) => (
                  <option key={publisher} value={publisher}>
                    {publisher}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="filterGenre" className="mb-3">
              <Form.Label>Filter by Genre</Form.Label>
              <Form.Select
                value={filterGenre}
                onChange={(e) => {
                  setFilterGenre(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="filterLength" className="mb-3">
              <Form.Label>Filter by Length</Form.Label>
              <Form.Select
                value={filterLength}
                onChange={(e) => {
                  setFilterLength(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All</option>
                <option value="Short">Short (≤ 20 chapters)</option>
                <option value="Medium">Medium (21-50 chapters)</option>
                <option value="Long">Long (longer than 50 chapters)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="filterScore" className="mb-3">
              <Form.Label>Filter by Rating</Form.Label>
              <Form.Select
                value={filterScore}
                onChange={(e) => {
                  setFilterScore(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All</option>
                <option value="High">High (≥ 4.5)</option>
                <option value="Medium">Medium (3 - 4.5)</option>
                <option value="Low">Low (&lt; 3)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="sortField" className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select
                value={sortField || ''}
                onChange={(e) => {
                  setSortField(e.target.value || null);
                  setCurrentPage(1);
                }}
              >
                <option value="">None</option>
                <option value="rating">Rating</option>
                <option value="chapters">Chapters</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="sortOrder" className="mb-3">
              <Form.Label>Order</Form.Label>
              <Form.Select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default FilterWrapper;