import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  render() {
    const daysToWedding = moment([2020, 5, 6]).diff(moment(), 'days');

    return (
      <div className="App">
        <header className="App-header">
          <img src="./wedding.png" className="App-logo" alt="Wedding is comming..." />
          <p>
            Svatba Kuby a Adélky se blíží.
          </p>
          <p>Bude se konat 6. 6. 2020 v Hotelu Monínec</p>
          <p>Do dne D zbývá {daysToWedding} dní</p>
        </header>
      </div>
    );
  }
}

export default App;
