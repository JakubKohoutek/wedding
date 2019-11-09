import React, {useState} from 'react';

import './map.css';

const Map: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="map">
      {loading && <p>Načítám...</p>}
      <iframe
        className={loading ? 'map--loading' : 'map--loaded'}
        title="google-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10355.433016035036!2d14.51653045879599!3d49.543827305752565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b627942e21671%3A0x382cd11852de2448!2sHotel%20Mon%C3%ADnec!5e0!3m2!1scs!2scz!4v1573323818066!5m2!1scs!2scz"
        width="600"
        height="450"
        allowFullScreen
        onLoad={(): void => setLoading(false)}
      />
    </div>
  );
};

export default Map;
