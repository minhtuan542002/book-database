import { createContext, useContext, useState, useEffect } from 'react';
import { fetchComics } from '../api/comicService';

const ComicContext = createContext();

export function ComicProvider({ children }) {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    refreshComics();
  }, []);
  const refreshComics = async () => {
    try {
      // const response = await fetchComics();
      // setComics(response.data);
      setComics([
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
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComicContext.Provider value={{ 
      comics, 
      loading, 
      error, 
      refreshComics, 
    }}>
      {children}
    </ComicContext.Provider>
  );
}

export const useComics = () => useContext(ComicContext);