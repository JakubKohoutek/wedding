import React from 'react';

import Emoji from '../../components/emoji';

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
        <p>úsměv nám vykouzlí z bankovek balíčky.</p>
        <br />
        <p className="gifts__thanks">
          Děkujeme <Emoji symbol="🙏" label="Thank you" />
        </p>
      </section>
    </div>
  );
};

export default Gifts;
