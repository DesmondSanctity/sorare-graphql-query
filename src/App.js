import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import PictureCards from './Picture';

function Home() {
  const [slugs, setSlugs] = useState(['']);
  return (
    <>
      <main className="container">
        <h1>Sorare Query</h1>

        <p style={{ color: 'white', margin: '8px 0 32px 0', fontWeight: 400 }}>
          Generate card or cards by inputting their slug(s) in the input box below
        </p>

        <div className="form-group">
          <label className="form-label">Input your slug(s):</label><br></br>
          <input type="text" className="form-input" placeholder="Enter slug..." value={slugs} onChange={e => { setSlugs(e.target.value) }} />
        </div>

        <Link
          style={{ margin: '32px' }}
          to={`/cards/${slugs}`}
        >
          <button>Go to cards page</button>
        </Link>
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/cards/:slug" element={<PictureCards />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
