import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles
import Router from './Router';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 600, // animation duration
      once: true,    // only animate once
      offset: 50,    // offset (in px) from the original trigger point
    });
  }, []);

  return <Router />;
};

export default App;
