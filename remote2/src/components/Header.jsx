import React from 'react';

export default function Header({ title, subtitle }) {
  return (
    <header
      style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{title}</span>
      {subtitle && (
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{subtitle}</span>
      )}
    </header>
  );
}
