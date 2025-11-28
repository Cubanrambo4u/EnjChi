/**
 * HatchButton Component - Large prominent button for hatching
 */

import React from 'react';
import './HatchButton.css';

interface HatchButtonProps {
  enabled: boolean;
  loading: boolean;
  onClick: () => void;
}

export const HatchButton: React.FC<HatchButtonProps> = ({ enabled, loading, onClick }) => {
  return (
    <button
      className={`hatch-button ${enabled ? 'enabled' : 'disabled'} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={!enabled || loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          <span>HATCHING...</span>
        </>
      ) : (
        <span>HATCH</span>
      )}
    </button>
  );
};
