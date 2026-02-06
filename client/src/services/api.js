const API_URL = '/api/todos';

export const fetchTodos = async (search = '', status = 'all') => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status !== 'all') params.append('status', status);

    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
};

export const createTodo = async (text) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
};

export const updateTodo = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
};
