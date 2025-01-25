import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Home() {
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublisher, setFilterPublisher] = useState('All');
  const [filterGenre, setFilterGenre] = useState('All');
  const [filterLength, setFilterLength] = useState('All');
  const [filterScore, setFilterScore] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  // Fetch comic data from the API
  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.example.com/comics'); // Replace with your API
        setComics(response.data);
      } catch (error) {
        //setError('Failed to load comics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchComics();
    if(comics){
      setComics(
        [
          {
            "id": 1,
            "title": "Batman: Year One",
            "author": "Frank Miller",
            "publisher": "DC Comics",
            "reviewComment": "A classic origin story with gritty realism.",
            "rating": 4.3,
            "ranking": 1,
            "genre":"mo m"
          },
          {
            "id": 2,
            "title": "Spider-Man: Blue",
            "author": "Jeph Loeb",
            "publisher": "Marvel Comics",
            "reviewComment": "A heartfelt and emotional exploration of Peter Parker's past.",
            "rating": 3,
            "ranking": 2,
            "genre":""
          },
          {
            "id": 3,
            "title": "Saga, Vol. 1",
            "author": "Brian K. Vaughan",
            "publisher": "Image Comics",
            "reviewComment": "A stunning space opera with a mix of fantasy and sci-fi.",
            "rating": 4.9,
            "ranking": 3,
            "genre":""
          },
          {
            "id": 5,
            "title": "Batman: Year One",
            "author": "Frank Miller",
            "publisher": "DC Comics",
            "genre": "Tragedy, Romance",
            "chapters": 15,
            "reviewComment": "A classic origin story with gritty realism.",
            "rating": 5,
            "ranking": 4
          },
          {
            "id": 4,
            "title": "Spider-Man: Blue",
            "author": "Jeph Loeb",
            "publisher": "Marvel Comics",
            "genre": "Romance",
            "chapters": 25,
            "reviewComment": "A heartfelt and emotional exploration of Peter Parker's past.",
            "rating": 4.5,
            "ranking": 4
          }
        ]
      );
    }
  }, []);

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
  const paginatedComics = filteredComics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const publishers = ['All', ...new Set(comics.map((comic) => comic.publisher))];
  const genres = [
    'All',
    ...Array.from(
      new Set(comics.flatMap((comic) => comic.genre.split(/[,/]/).map((g) => g.trim())))
    ),
  ];

  return (
    <div>
      <Container>
        <h1 className="text-center">My Favorite Comics</h1>
        <div className="mb-2">
          <Button
            variant="secondary"
            onClick={() => setFiltersVisible(true)}
            className="ms-auto"
          >
            Open Filters
          </Button>
        </div>
        {/* Loading Spinner */}
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

            {/* Pagination */}
            <div className="d-flex justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? 'primary' : 'outline-primary'}
                  className="mx-1"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
            </div>
          </>
        )}
      </Container>

      {/* Filter Sidebar */}
      <Offcanvas show={filtersVisible} onHide={() => setFiltersVisible(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters & Sorting</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
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
                <option value="Medium">Medium (3-4.5)</option>
                <option value="Low">Low (less than 3)</option>
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

export default Home;