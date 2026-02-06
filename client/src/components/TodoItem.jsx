import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`flex items-center justify-between p-4 mb-2 bg-white rounded shadow transition-all ${todo.completed ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={!!todo.completed}
                    onChange={() => onToggle(todo.id, !todo.completed)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
            >
                Delete
            </button>
        </div>
    );
}

export default TodoItem;
