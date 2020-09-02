import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Emoji from '../../components/emoji';

import './info.css';

const Info: React.FunctionComponent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="info">
      <h2>Informace pro svatebčany</h2>
      <h4>Obřad</h4>
      <p>
        Slavnostní obřad je v sobotu naplánován na <b>12. hodinu</b>.
      </p>
      <p>
        Prosíme o příjezd ideálně <b>nejpozději okolo 11:30</b>, abychom vás mohli ještě
        ozdobit jako správné svatebčany, stihli jste si dát nějaký ten chlebíček či se
        případně ubytovat. Také bychom se rádi vyhnuli zbytečnému stresu.{' '}
        <Emoji symbol="😊" label=":-)" />
      </p>
      <p>
        Obědvat budeme později, proto bude před obřadem připraveno i malé občerstvení.
        Byli bychom totiž neradi, kdyby svatebčané kdykoli během dne trpěli žízní či
        hladem. <Emoji symbol="😊" label=":-)" />
      </p>
      <h4>Harmonogram</h4>
      <p>
        Předběžný harmonogram svatebního dne je k dispozici{' '}
        <Link to="/schedule">zde</Link>. Práva na změnu a úpravu vyhrazena.
      </p>
      <h4>Počasí</h4>
      <p>
        Samozřejmě doufáme, že bude pěkné počasí a bude nám svítit krásně sluníčko.
        Upozorňujeme však - a někteří tuší více než jiní - že možnost deště u akce rodiny
        Kohoutkových tu vždy je, a proto doporučujeme přibalit s sebou deštníky. Obřad
        bude totiž probíhat venku.
      </p>
      <h4>Focení během dne</h4>
      <p>
        Máme na vás <b>jednu prosbu</b> - během obřadu, prosíme, schovejte své foťáky a
        telefony a užijte si tuto chvíli naplno s námi. Chceme vidět vaše tváře.{' '}
        <Emoji symbol="😊" label=":-)" />
      </p>
      <p>
        Profesionální fotografie a také video záznam ze svatby s vámi budeme sdílet co
        nejdříve po svatbě.
      </p>
      <p>
        O to samé prosíme i při společném focení. Nejkrásnější budou totiž společné
        fotografie, na kterých se všichni dívají na jednoho fotografa. Ten vás na přání
        samozřejmě velmi rád vyfotografuje s kýmkoliv.
      </p>
      <p>
        Naopak, pokud budete chtít fotit během večerní zábavy, kdy fotograf na svatbě již
        nebude, budeme rádi. V tom případě uvítáme, pokud s námi povedené fotografie pak
        nasdílíte. <Emoji symbol="👍" label=";-)" />
      </p>
      <h2>Informace pro ubytované</h2>
      <p>
        Po příjezdu se, prosím, ohlaste na recepci, kde budou mít k dispozici váš jmenný
        seznam a sdělí vám, ve kterém pokoji jste ubytovaní.
      </p>
      <h4>Pátek</h4>
      <p>
        Pro hosty přijíždějící již v <b>pátek</b> je ubytování možné od <b>14 hodin</b>. V
        tento den je pro ubytované zdarma k dispozici i vnitřní wellness.
      </p>
      <h4>Sobota</h4>
      <p>
        Pro hosty přijíždějící až v sobotu budou pokoje připraveny od 10 hodin, takže
        netřeba nutně přijíždět již vystrojen.
      </p>
      <h4>Neděle</h4>
      <p>V neděli je čas pro opuštění pokoje různý dle místa ubytování:</p>
      <ul>
        <li>
          Pro ubytované na <b>Čertovce</b> a v <b>1. patře hotelu</b> je check-out posunut
          na <b>12. hodinu</b>
        </li>
        <li>
          Pro ubytované ve <b>2. patře hotelu</b> je bohužel nezbytné opustit pokoj
          nejpozději v <b>11 hodin</b>
        </li>
      </ul>

      <p>
        Po celou dobu je pro otužilce k dispozici i venkovní bazén, který je vyhřívaný na
        26 °C. Svatebčanům doporučujeme tedy plavky s sebou.
      </p>
    </div>
  );
};

export default Info;
