import React from 'react';
import Icon from './Icon.jsx';

export default function EmptyState({ 
  icon = "search_off", 
  title = "No results found", 
  message = "We couldn't find what you're looking for.", 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center px-5">
      <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-surface-container text-outline">
        <Icon name={icon} style={{ fontSize: 32 }} />
      </div>
      <h3 className="text-xl font-extrabold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm text-outline max-w-sm">{message}</p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-secondary mt-6 rounded-xl px-6 py-3 text-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
