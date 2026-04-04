import React from 'react';

export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.6rem 1.4rem',
        fontSize: '1rem',
        backgroundColor: '#70e546',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
