import React from 'react';

function FilterBar({ search, onSearchChange, filter, onFilterChange }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div className="relative w-full md:w-auto flex-1">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search todos..."
                    className="w-full p-2 pl-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex gap-2 bg-white p-1 rounded border border-gray-200">
                {['all', 'active', 'completed'].map((status) => (
                    <button
                        key={status}
                        onClick={() => onFilterChange(status)}
                        className={`px-4 py-1.5 rounded text-sm font-medium capitalize transition-colors ${filter === status
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterBar;
