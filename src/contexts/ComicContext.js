import { createContext, useContext, useState } from 'react';
import { fetchComics } from '../api/comicService';

const ComicContext = createContext();

export function ComicProvider({ children }) {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshComics = async () => {
    try {
      const response = await fetchComics();
      setComics(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComicContext.Provider value={{ comics, loading, error, refreshComics }}>
      {children}
    </ComicContext.Provider>
  );
}

export const useComics = () => useContext(ComicContext);