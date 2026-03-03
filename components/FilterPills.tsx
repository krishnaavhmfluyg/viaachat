
import React from 'react';

const Pill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
        active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
};

interface FilterPillsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'Unread', 'Groups'];

  return (
    <div className="px-4 py-2 flex space-x-2">
      {filters.map((filter) => (
        <Pill
          key={filter}
          label={filter}
          active={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
        />
      ))}
    </div>
  );
};
