import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  render() {
    const daysToWedding = moment([2019, 8, 21]).diff(moment(), 'days');

    return (
      <div className="App">
        <header className="App-header">
          <img src="./public/wedding.png" className="App-logo" alt="Wedding is comming..." />
          <p>
            Svatba Kuby a Adélky se blíží.
          </p>
          <p>Zbývá {daysToWedding} dní</p>
        </header>
      </div>
    );
  }
}

export default App;
