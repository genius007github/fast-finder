import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    
    axios.get('/data.json')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (query) {
      const filteredResults = data.filter(item => 
        item.country.toLowerCase().includes(query.toLowerCase()) ||
        item.capital.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query, data]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for a country or capital..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((item, index) => (
            <li key={index}>
              <strong>Country:</strong> {item.country} <br />
              <strong>Capital:</strong> {item.capital}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
