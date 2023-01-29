import React from "react";
import './App.css';
import LocationSearchForm from './components/LocationSearchForm.jsx';

const App = () => {
  return (
    <div className="App">
      <h1> Pinball Finder</h1>
      <div className="form-container">
        <LocationSearchForm />
        <br />
      </div>
    </div>
  );
}

export default App;
