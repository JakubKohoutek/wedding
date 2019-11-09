import React from 'react';
import moment from 'moment';

import './home.css';

const App: React.FunctionComponent = () => {
  const daysToWedding = moment([2020, 5, 6]).diff(moment(), 'days');

  return (
    <div className="home">
      <header>
        <h1>Svatba Kuby a Adélky</h1>
      </header>
      <section>
        <p>Bude se konat 6. 6. 2020 v Hotelu Monínec</p>
        <p>Do dne D zbývá {daysToWedding} dní!</p>
      </section>
    </div>
  );
};

export default App;
