import React from 'react';
import Button from './components/Button';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Remote App (port 3001)</h1>
      <p>This app exposes the component below via Module Federation:</p>
      <Button label="I am the Remote Button!" onClick={() => alert('Clicked on remote!')} />
    </div>
  );
}
