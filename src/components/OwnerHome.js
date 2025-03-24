import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Collapse,
  Modal
} from 'react-bootstrap';
import FilterWrapper from "./FilterWrapper"
import ComicListEdit from './ComicListEdit';
import { useAuth } from '../contexts/AuthContext';
import { useComics } from "../contexts/ComicContext"
import { createComic, updateComic, deleteComic, fetchComics } from '../api/comicService';

function OwnerHome() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);
  const [newComic, setNewComic] = useState({
    title: '',
    author: '',
    publisher: '',
    genre: '',
    chapters: '',
    reviewComment: '',
    rating: '',
    ranking: ''
  });

  const {refreshComics} = useComics();
  const { token } = useAuth();

  const handleAddComic = async (e) => {
    e.preventDefault();    
    if (!token) return;

    await createComic(newComic, token);
    await refreshComics();
    setShowAddForm(false);
    setNewComic({
      title: '',
      author: '',
      publisher: '',
      genre: '',
      chapters: '',
      reviewComment: '',
      rating: '',
      ranking: ''
    });
  };

  const handleEditComic = async (e) => {
    e.preventDefault();
    if (!token || !selectedComic) return;

    await updateComic(selectedComic, token);
    await refreshComics();
    setSelectedComic(null);
  };

  const handleDeleteComic = async () => {
    if (!token || !selectedComic) return;

    await deleteComic(selectedComic.id, token);
    await refreshComics();
    setSelectedComic(null);
  };

  const handleRowClick = (comic) => {
    setSelectedComic({...comic});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComic(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <h1 className="text-center">Manage Comics</h1>
      <div className="mb-3 d-flex justify-content-between">
        <Button
          variant="success"
          onClick={() => setShowAddForm(!showAddForm)}
          aria-controls="add-comic-form"
          aria-expanded={showAddForm}
        >
          {showAddForm ? 'Cancel' : 'Add New Comic'}
        </Button>
      </div>

      <Collapse in={showAddForm}>
      <div id="add-comic-form" className="mb-4 card card-body">
          <h5 className="mb-3">Add New Comic</h5>
          <Form onSubmit={handleAddComic}>
            <div className="row g-2 mb-3">
              <div className="col-1">
                <Form.Group>
                  <Form.Label>Ranking</Form.Label>
                  <Form.Control
                    type="number"
                    name="ranking"
                    value={newComic.ranking}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group>
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newComic.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-3">
                <Form.Group>
                  <Form.Label>Author *</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={newComic.author}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-2">
                <Form.Group>
                  <Form.Label>Publisher *</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    value={newComic.publisher}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-2">
                <Form.Group>
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    type="text"
                    name="genre"
                    value={newComic.genre}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-1">
                <Form.Group>
                  <Form.Label>Chapters</Form.Label>
                  <Form.Control
                    type="number"
                    name="chapters"
                    value={newComic.chapters}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-1">
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newComic.rating}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            
              <div className="col-11">
                <Form.Group>
                  <Form.Label>Review Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="reviewComment"
                    value={newComic.reviewComment}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="success" type="submit">
                Add Comic
              </Button>
            </div>
          </Form>
        </div>
      </Collapse>

      <Modal show={!!selectedComic} onHide={() => setSelectedComic(null)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Comic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComic && (
            <Form onSubmit={handleEditComic}>
              <div className="row g-2 mb-3">
                <div className="col-1">
                  <Form.Group>
                    <Form.Label>Ranking</Form.Label>
                    <Form.Control
                      type="number"
                      name="ranking"
                      value={selectedComic.ranking}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        ranking: e.target.value
                      })}
                    />
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group>
                    <Form.Label>Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={selectedComic.title}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        title: e.target.value
                      })}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group>
                    <Form.Label>Author *</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={selectedComic.author}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        author: e.target.value
                      })}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-2">
                  <Form.Group>
                    <Form.Label>Publisher *</Form.Label>
                    <Form.Control
                      type="text"
                      name="publisher"
                      value={selectedComic.publisher}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        publisher: e.target.value
                      })}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-2">
                  <Form.Group>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                      type="text"
                      name="genre"
                      value={selectedComic.genre}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        genre: e.target.value
                      })}
                    />
                  </Form.Group>
                </div>
                
                <div className="col-1">
                  <Form.Group>
                    <Form.Label>Chapters</Form.Label>
                    <Form.Control
                      type="number"
                      name="chapters"
                      value={selectedComic.chapters}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        chapters: e.target.value
                      })}
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-1">
                  <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating"
                      min="1"
                      max="5"
                      step="0.1"
                      value={selectedComic.rating}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        rating: e.target.value
                      })}
                    />
                  </Form.Group>
                </div>
                <div className="col-11">
                  <Form.Group>
                    <Form.Label>Review Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      name="reviewComment"
                      value={selectedComic.reviewComment}
                      onChange={(e) => setSelectedComic({
                        ...selectedComic,
                        reviewComment: e.target.value
                      })}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* Other fields similar to Add form */}
              
              <div className="d-flex justify-content-between align-items-center gap-2 mt-3">

                <Button variant="danger"  onClick={handleDeleteComic}>
                  Delete
                </Button>

                <div className="d-flex gap-2">
                  <Button variant="secondary" onClick={() => setSelectedComic(null)}>
                    Cancel
                  </Button>
                  <Button variant="success" type="submit">
                    Save Changes
                  </Button>
                </div>
              </div>

            </Form>
          )}
        </Modal.Body>
      </Modal>

      <FilterWrapper>
        <ComicListEdit onClick={handleRowClick}/>
      </FilterWrapper>

    </Container>
  );
}

export default OwnerHome;