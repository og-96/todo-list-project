const fetch = require('node-fetch');

const API_URL = "http://localhost:3000/todos";

// TODOS holen
async function fetchTodos() {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error("Failed to fetch todos");
    }
    return await res.json();
}

// TODO hinzufügen
async function addTodoApi(newTodo) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodo, done: false }),
    });

    if (!res.ok) {
        throw new Error("Failed to add todo");
    }
    return await res.json();
}

// TODO löschen
async function deleteTodoApi(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete todo");
    }
}

// TODO aktualisieren
async function updateTodoApi(id, updatedTodo) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!res.ok) {
        throw new Error("Failed to update todo");
    }
    return await res.json();
}

module.exports = {
    fetchTodos,
    addTodoApi,
    deleteTodoApi,
    updateTodoApi,
};