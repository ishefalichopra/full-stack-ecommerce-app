import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
          credentials: 'include', // optional: if your backend uses cookies
        });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const result = await res.json();

        const formatted = result.map(product => ({
          ...product,
          id: product._id || product.id,
        }));

        if (!isCancelled) setData(formatted);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
