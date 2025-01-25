import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Home from "./components/Home"
import Modal from "react-bootstrap/Modal";
import './App.css';

const API_BASE_URL = "https://your-gateway-api-url.com";

function App() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingComic, setEditingComic] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingComicId, setDeletingComicId] = useState(null);

  useEffect(() => {
    fetchComics();
  }, []);
  
  const fetchComics = ()=>{
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
  }

  const handleLogin = async (email, password) => {
    setAuthError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      setAuthToken(response.data.token);
      setUser(response.data.user);
    } catch (err) {
      setAuthError("Invalid email or password.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAuthToken(null);
      setUser(null);
    } catch (err) {
      console.error("Failed to log out.");
    }
  };

  const handleAddEditComic = async (comic) => {
    const isEditing = !!editingComic;
    try {
      if (isEditing) {
        // Update existing comic
        await axios.put(
          `${API_BASE_URL}/comics/${editingComic.id}`,
          comic,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
      } else {
        // Add new comic
        await axios.post(`${API_BASE_URL}/comics`, comic, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      }
      fetchComics();
      setShowAddEditModal(false);
    } catch (err) {
      console.error("Failed to save comic.");
    }
  };

  const handleDeleteComic = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/comics/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      fetchComics();
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error("Failed to delete comic.");
    }
  };
  return (
    <div>
    <Navbar bg="dark" variant="dark" className="mb-4">
    <Container>
      <Navbar.Brand href="#">My Comic Database</Navbar.Brand>
      {user ? (
        <div>
          <span className="text-white me-3">Welcome, {user.name}!</span>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <Button variant="outline-light" >{/*onClick={() => setFiltersVisible(true)}*/}
          Login
        </Button>
      )}
    </Container>
  </Navbar>

  <Home></Home>

  {/* Add/Edit Modal */}
  <Modal
    show={showAddEditModal}
    onHide={() => setShowAddEditModal(false)}
    backdrop="static"
  >
    <Modal.Header closeButton>
      <Modal.Title>{editingComic ? "Edit Comic" : "Add Comic"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Add/Edit Form Here */}
    </Modal.Body>
  </Modal>

  {/* Delete Confirmation Modal */}
  <Modal
    show={showDeleteConfirm}
    onHide={() => setShowDeleteConfirm(false)}
    backdrop="static"
  >
    <Modal.Header closeButton>
      <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this comic?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={() => handleDeleteComic(deletingComicId)}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
</div>
);
}

export default App;