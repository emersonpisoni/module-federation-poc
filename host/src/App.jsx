import React, { Suspense, lazy } from 'react';

const RemoteButton = lazy(() => import('remote/Button'));
const RemoteHeader = lazy(() => import('remote2/Header'));

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Suspense fallback={<span>Loading header...</span>}>
        <RemoteHeader title="Host App" subtitle="Composed with components from remote and remote2" />
      </Suspense>

      <div style={{ padding: '2rem' }}>
        <p>The button below comes from <strong>remote</strong> (port 3001):</p>
        <Suspense fallback={<span>Loading button...</span>}>
          <RemoteButton
            label="I am the Remote Button!"
            onClick={() => alert('Clicked on host!')}
          />
        </Suspense>
      </div>
    </div>
  );
}
