import React from 'react';

import './gifts.css';

const Gifts: React.FunctionComponent = () => {
  return (
    <div className="gifts">
      <section className="gifts__poem">
        <p>Lásku, štěstí i vybavení domácnosti máme,</p>
        <p>Proto oba velmi uvítáme</p>
        <p>Váš příspěvek v jakékoliv výši,</p>
        <p>Který nám šanci na pořízení bydlení zvýší.</p>
        <br />
        <p>Spíše než hrnce, skleničky, kávovar či pánvičky</p>
        <p>Radost nám tedy udělají spíše peněžní balíčky.</p>
      </section>
    </div>
  );
};

export default Gifts;
