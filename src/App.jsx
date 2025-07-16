import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/cities?query=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <h1>Cities List</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading &&
        !error &&
        (cities.length > 0 ? (
          <ul>
            {cities.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        ) : (
          <p>No cities found</p>
        ))}
    </div>
  );
}

export default App;
