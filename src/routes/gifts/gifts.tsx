import React from 'react';

import './gifts.css';

const Gifts: React.FunctionComponent = () => {
  return (
    <div className="gifts">
      <section className="gifts__poem">
        <p>Lásku, štěstí i vybavení domácnosti už máme,</p>
        <p>proto oba velmi uvítáme</p>
        <p>váš příspěvek v jakékoliv výši,</p>
        <p>který nám šanci na byt či dům zvýší.</p>
        <br />
        <p>Spíše než hrnce, skleničky, kávovar či pánvičky</p>
        <p>úsměv nám vykouzlí peněžní balíčky.</p>
        <br />
        <p className="gifts__thanks">
          {/* eslint-disable-next-line */}
          Děkujeme <span role="img" aria-label="Thank you emoji">🙏</span>
        </p>
      </section>
    </div>
  );
};

export default Gifts;
