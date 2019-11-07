import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
  render() {
    const daysToWedding = moment([2020, 5, 6]).diff(moment(), 'days');

    return (
      <div className="app">
        <header className="app-header">
          <h1>
            Svatba Kuby a Adélky se blíží
          </h1>
        </header>
        <section className="app-section">
          <p>Bude se konat 6. 6. 2020 v Hotelu Monínec</p>
          <p>Do dne D zbývá {daysToWedding} dní!</p>
        </section>
      </div>
    );
  }
}

export default App;
