import React from 'react';
import moment from 'moment';

import './home.css';

const getDaysToWeddingMessage = (): string => {
  const daysToWedding = moment([2020, 8, 5]).diff(moment(), 'days');

  if (daysToWedding >= 2) {
    return `Do dne D zbývají ${daysToWedding} dni!`;
  }

  if (daysToWedding === 1) {
    return `Den D je již pozítří, to to uteklo!`;
  }

  if (daysToWedding === 0) {
    return `Den D je již zítra, těšíme se na vás!`;
  }

  if (daysToWedding === -1) {
    return `Dnes je ten velký den, držte nám palce.`;
  }

  return 'Svatba již proběhla, moc všem děkujeme.';
};

const App: React.FunctionComponent = () => {
  return (
    <div className="home">
      <header>
        <h1>Svatba Kuby a Adélky</h1>
        <p>Bude se konat 5. 9. 2020 ve 12 hodin v Hotelu Monínec.</p>
        <p>{getDaysToWeddingMessage()}</p>
        <p>
          Kvůli současné nejisté situaci jsme byli bohužel nuceni přeložit původní termín
          svatby z 6. června na září. Nechtěli jsme totiž škrtat ze seznamu hostů ani
          příliš riskovat zdraví svatebčanů.
        </p>
        <img src="/us_compressed.jpg" alt="Nase fotka" className="home__our-photo" />
      </header>
      <section>
        <p>
          Vítej na stránkách budoucích manželů Kohoutkových. Máme se rádi, a proto jsme se
          rozhodli vzít, i když nás osud zkouší, jak může.
        </p>
        <p>
          Pokud jsi od nás obdržel svatební oznámení, znamená to, že bychom s Tebou tuhle
          událost velmi rádi oslavili.
        </p>
        <p>
          Aby vše probíhalo hladce a všichni se dobře bavili, potřebovali bychom vědět
          několik informací o našich svatebčanech. Protože jsme pokrokoví, rozhodli jsme
          se využít moderních technologií a vytvořit tuto stránku jako jeden informační
          kanál pro nás i pro tebe.
        </p>
        <p>
          V případě, že se rozhodneš bavit v červnu s námi, prosíme Tě o{' '}
          <a href="/login">registraci</a> a následné vyplnění{' '}
          <a href="/questionnaire">krátkého dotazníku</a>.
        </p>
      </section>
    </div>
  );
};

export default App;
