import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <main className="bg-[var(--color-bg)] min-h-screen text-[var(--color-text)] transition-colors duration-500">
      <CustomCursor theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      {/* <Hero theme={theme} /> */}
      <About />
      <Works />
      {/* <Feedback /> */}
      <Contact />
    </main>
  );
}

export default App;
