import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, 
    Table, 
    Form, 
    Button, 
    Spinner, 
    Alert, 
    Offcanvas, 
    Modal } from 'react-bootstrap';
import ComicCard from './ComicCard';

function OwnerHome() {
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentComic, setCurrentComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initial empty comic state
  const emptyComic = {
    title: '',
    author: '',
    publisher: 'DC Comics',
    genre: '',
    chapters: 0,
    reviewComment: '',
    rating: 0,
    ranking: 0
  };

  // Fetch comics from API
  const fetchComics = async () => {
    try {
      const response = await axios.get('https://example-domain.com/goals');
      setComics(response.data);
    } catch (error) {
      setError('Failed to load comics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  // CRUD Operations
  const handleSave = async (comicData) => {
    try {
      if (comicData.id) {
        await axios.put(`https://example-domain.com/goals/${comicData.id}`, comicData);
      } else {
        await axios.post('https://example-domain.com/goals', comicData);
      }
      fetchComics();
    } catch (error) {
      setError('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://example-domain.com/goals/${id}`);
      fetchComics();
    } catch (error) {
      setError('Delete failed');
    }
  };

  // Modal Form
  const ComicForm = () => (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{currentComic.id ? 'Edit Comic' : 'Add Comic'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          handleSave(currentComic);
          setShowModal(false);
        }}>
          <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control 
              required
              value={currentComic.title}
              onChange={(e) => setCurrentComic({...currentComic, title: e.target.value})}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Author*</Form.Label>
            <Form.Control 
              required
              value={currentComic.author}
              onChange={(e) => setCurrentComic({...currentComic, author: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Publisher*</Form.Label>
            <Form.Select 
              value={currentComic.publisher}
              onChange={(e) => setCurrentComic({...currentComic, publisher: e.target.value})}
            >
              <option>DC Comics</option>
              <option>Marvel Comics</option>
              <option>Image Comics</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control 
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={currentComic.rating}
              onChange={(e) => setCurrentComic({...currentComic, rating: e.target.value})}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );

  return (
    <Container>
      <h1 className="text-center my-4">Manage Comics</h1>
      
      <div className="d-flex justify-content-between mb-4">
        <Button 
          variant="primary" 
          onClick={() => {
            setCurrentComic(emptyComic);
            setShowModal(true);
          }}
        >
          Add New Comic
        </Button>
        
        <Form.Control
          type="search"
          placeholder="Search comics..."
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comics
              .filter(comic => 
                comic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comic.author.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(comic => (
                <tr key={comic.id}>
                  <td>{comic.title}</td>
                  <td>{comic.author}</td>
                  <td>{comic.publisher}</td>
                  <td>{comic.rating}/5</td>
                  <td>
                    <Button 
                      variant="warning" 
                      className="me-2"
                      onClick={() => {
                        setCurrentComic(comic);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger"
                      onClick={() => handleDelete(comic.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}

      <ComicForm />
    </Container>
  );
}

export default OwnerHome;