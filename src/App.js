import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './videoplayer';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&part=snippet&key=AIzaSyDi5YU1DptRwe3ekFPelkeVB6sqSxnknGA`
      );

      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching for videos:', error);
    }
  };

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  useEffect(() => {
    if (selectedVideoId) {
      
      console.log(`Selected video ID: ${selectedVideoId}`);
    }
  }, [selectedVideoId]);

  return (
    <div className="container">
      <h1>YouTube Song Search</h1>
      <div>
        <label>
          Search for a Song:
          <input type="text" value={searchQuery} onChange={handleInputChange} />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Search Results:</h2>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id.videoId}>
              <button onClick={() => handleVideoSelect(result.id.videoId)}>
                {result.snippet.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedVideoId && <VideoPlayer videoId={selectedVideoId} />}
    </div>
  );
};

export default App;
