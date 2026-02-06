import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoItem from './components/TodoItem';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos(search, filter);
      setTodos(data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load todos. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadTodos();
    }, 300); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [search, filter]);

  const handleAdd = async (text) => {
    try {
      await createTodo(text);
      loadTodos();
    } catch (err) {
      alert('Error adding todo');
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      // Optimistic update
      setTodos(todos.map(t => t.id === id ? { ...t, completed: completed ? 1 : 0 } : t));
      await updateTodo(id, { completed });
      loadTodos(); // Sync with server
    } catch (err) {
      loadTodos(); // Revert on error
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      alert('Error deleting todo');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Task Manager</h1>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <TodoForm onAdd={handleAdd} />
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No todos found.</p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
