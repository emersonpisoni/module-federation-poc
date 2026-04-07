# Module Federation POC

Study POC using Webpack 5 Module Federation with React 18.

## Structure

```
module-federation-poc/
├── host/     # Shell app — consumes components from remote and remote2 (port 3000)
├── remote/   # Micro-frontend — exposes the Button component (port 3001)
└── remote2/  # Micro-frontend — exposes the Header component (port 3002)
```

## How to run

### 1. Start the remotes (required first)

```bash
cd remote
npm start
# running at http://localhost:3001
```

```bash
cd remote2
npm start
# running at http://localhost:3002
```

### 2. Start the Host (in another terminal)

```bash
cd host
npm start
# running at http://localhost:3000
```

Open **http://localhost:3000** and see both the Header (from remote2) and the Button (from remote) being rendered inside the Host.

---

## How it works

### Remote (`remote/webpack.config.js`)

The `ModuleFederationPlugin` exposes the `Button` component:

```js
new ModuleFederationPlugin({
  name: 'remote',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

### Remote2 (`remote2/webpack.config.js`)

The `ModuleFederationPlugin` exposes the `Header` component:

```js
new ModuleFederationPlugin({
  name: 'remote2',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/components/Header',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

### Host (`host/webpack.config.js`)

The `ModuleFederationPlugin` declares where to find both remotes:

```js
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remote:  'remote@http://localhost:3001/remoteEntry.js',
    remote2: 'remote2@http://localhost:3002/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
```

### Consuming in code (`host/src/App.jsx`)

```jsx
const RemoteButton = lazy(() => import('remote/Button'));
const RemoteHeader = lazy(() => import('remote2/Header'));

<Suspense fallback="Loading...">
  <RemoteHeader title="Host App" subtitle="..." />
</Suspense>

<Suspense fallback="Loading...">
  <RemoteButton label="Click me!" onClick={...} />
</Suspense>
```

---

## Key concepts

| Concept | Description |
|---|---|
| `name` | Global identifier of the app at runtime |
| `filename` | Manifest file exposed by the remote |
| `exposes` | Modules the remote makes available to others |
| `remotes` | Addresses of the remotes the host will consume |
| `shared` | Shared dependencies (avoids duplicating React) |
| `singleton: true` | Ensures only one React instance runs on the page |
| `bootstrap.js` | Async entry point — required for MF to initialize properly |

---

## Module Federation vs. static library

A common question is: why run separate servers instead of publishing components as an npm package?

**Static library (npm package)**
- Host installs and bundles the component at build time
- Any update to the component requires: `npm update` → rebuild → redeploy of the host
- Host and remote have **coupled deploys**

**Module Federation**
- The host fetches components from the remote at runtime
- A new deploy of the remote is instantly available to all consumers — no rebuild needed
- Host and remote have **independent deploys**

The trade-off is operational cost: you need to serve the remote's static files somewhere. In production, this is typically just a CDN (e.g. S3 + CloudFront) serving `remoteEntry.js` and the component chunks — no server-side processing required.

| Situation | Recommendation |
|---|---|
| One team, one repo, deployed together | npm package or monorepo |
| Different teams with different deploy cadences | Module Federation |
| Component changes rarely | npm package |
| Component changes often and can't force host redeploy | Module Federation |
| Small application | npm package (MF is over-engineering) |
| Multiple apps consuming the same component in production | MF starts to pay off |