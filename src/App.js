import React from "react";
import './App.css';
import LocationSearch from './components/LocationSearch.jsx';

const App = () => {
  return (
    <div className="App">
      <h1> Pinball Finder</h1>
      <div className="form-container">
        <LocationSearch />
        <br />
      </div>
    </div>
  );
}

export default App;
