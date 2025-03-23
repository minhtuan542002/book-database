import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AppRouter from './AppRouter';
import AuthNav from './components/AuthNav';
import { fetchComics } from './api/comicService';

function App() {
  const [user, setUser] = useState(null);
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComics = async () => {
      try {
        const response = await fetchComics();
        setComics(response.data);
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
      } catch (error) {
        console.error('Failed to load comics');
      } finally {
        setLoading(false);
      }
    };
    loadComics();
  }, []);

  return (
    <div>
      {/* <AuthNav user={user} onLogout={() => setUser(null)} /> */}

      <AppRouter 
        isAuthenticated={!!user}
        comics={comics}
        loading={loading}
      />
    </div>
  );
}

export default App;