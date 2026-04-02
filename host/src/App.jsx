import React, { Suspense, lazy } from 'react';

// Remote component import via Module Federation.
// Webpack resolves "remote/Button" by fetching the remoteEntry.js
// configured in the host's webpack.config.js.
const RemoteButton = lazy(() => import('remote/Button'));

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Host App (port 3000)</h1>
      <p>The button below comes from the <strong>Remote App</strong> via Module Federation:</p>

      <Suspense fallback={<span>Loading remote component...</span>}>
        <RemoteButton
          label="I am the Remote Button!"
          onClick={() => alert('Clicked on host!')}
        />
      </Suspense>
    </div>
  );
}
