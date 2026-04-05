import React from 'react';
import Header from './components/Header';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header title="Remote 2 App" subtitle="Running standalone on port 3002" />
      <div style={{ padding: '2rem' }}>
        <p>This app exposes the Header component via Module Federation.</p>
      </div>
    </div>
  );
}
