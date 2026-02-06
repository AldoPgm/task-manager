import React, { useState } from 'react';

function TodoForm({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="E.g., Buy groceries, Finish presentation, Call dentist..."
                className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                disabled={!text.trim()}
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
