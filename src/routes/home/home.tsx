import React from 'react';
import moment from 'moment';

import './home.css';

const App: React.FunctionComponent = () => {
  const daysToWedding = moment([2020, 5, 6]).diff(moment(), 'days');

  return (
    <div className="home">
      <header>
        <h1>Svatba Kuby a Adélky</h1>
        <p className="home__countdown">
          Bude se konat 6. 6. 2020 ve 12 hodin v Hotelu Monínec.
        </p>
        <p className="home__countdown">Do dne D zbývá {daysToWedding} dní!</p>
        <img src="/us_compressed.jpg" alt="Nase fotka" className="home__our-photo" />
      </header>
      <section>
        <p>
          Vítej na stránkách budoucích manželů Kohoutkových. Máme se rádi, a proto jsme se
          rozhodli vzít.
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
