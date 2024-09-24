<script>
  import { onMount } from "svelte";
  import {
    fetchTodos,
    addTodoApi,
    deleteTodoApi,
    updateTodoApi,
  } from "./api.js";

  let todos = [];
  let newTodo = "";
  let editingIndex = null;
  let editingText = "";

  // TODOS holen
  async function loadTodos() {
    try {
      todos = await fetchTodos();
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  }

  onMount(loadTodos);

  // TODO hinzufügen
  async function addTodo() {
    if (newTodo.trim() === "") return;

    try {
      const newTodoItem = await addTodoApi(newTodo);
      todos = [...todos, newTodoItem];
      newTodo = "";
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }

  // TODO löschen
  async function deleteTodo(index) {
    const todo = todos[index];
    try {
      await deleteTodoApi(todo.id);
      todos = todos.filter((_, i) => i !== index);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  }

  // TODO Edit init ==> in Bearbeitung Ansicht schalten
  function editTodoinit(index) {
    editingIndex = index;
    editingText = todos[index].text;
  }

  // TODO Edit Cancel ==> Bearbeitung Ansicht ausschalten
  function cancelEdit() {
    editingIndex = null;
    editingText = "";
  }

  // TODO Aktualisierter Text speichern
  async function editTodoSafe() {
    if (editingText.trim() === "") return;

    const todo = todos[editingIndex];
    try {
      await updateTodoApi(todo.id, { text: editingText, done: todo.done });
      todos[editingIndex].text = editingText;
      editingIndex = null;
      editingText = "";
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  }

  // TODO Done Status aktualisieren
  async function toggleTodoDone(index) {
    const todo = todos[index];
    try {
      await updateTodoApi(todo.id, { text: todo.text, done: !todo.done });
      todos[index].done = !todo.done;
    } catch (error) {
      console.error("Failed to toggle todo status:", error);
    }
  }
</script>

<header>
  <h1>To-Do List</h1>
</header>

<div class="container">
  <div class="input-group">
    <textarea
      name="todo"
      id="todoInput"
      placeholder="Add new Todo"
      bind:value={newTodo}
      rows="1"
    ></textarea>
    <button on:click={addTodo}>Add</button>
  </div>

  <ul>
    {#each todos as todo, index}
      <li>
        {#if editingIndex === index}
          <div class="edit-group">
            <textarea bind:value={editingText} rows="1"></textarea>
            <button on:click={editTodoSafe}>Save</button>
            <button on:click={cancelEdit}>Cancel</button>
          </div>
        {:else}
          <div class="todo-item">
            <input
              type="checkbox"
              checked={todo.done}
              on:change={() => toggleTodoDone(index)}
            />
            <textarea
              class="todo-text"
              class:done={todo.done}
              readonly
              rows="1"
              bind:value={todo.text}
            ></textarea>
            <div class="action-buttons">
              <button class="edit-button" on:click={() => editTodoinit(index)}
                >Edit</button
              >
              <button class="delete-button" on:click={() => deleteTodo(index)}
                >Delete</button
              >
            </div>
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  header {
    background-color: #4a90e2;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  }

  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }

  .input-group {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    align-items: flex-start;
  }

  textarea {
    flex: 1;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    min-height: 40px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: visible;
  }

  button {
    padding: 12px;
    font-size: 16px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #357ab8;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 16px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: #f3f4f6;
    transition: transform 0.2s;
    font-size: 16px;
    display: flex;
    flex-direction: column;
  }

  li:hover {
    transform: scale(1.02);
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
  }

  .todo-text {
    flex: 1;
    min-height: 60px;
    color: black;
    background-color: transparent;
    border: none;
    resize: none;
    overflow: visible;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .todo-text.done {
    text-decoration: line-through;
    color: gray;
  }

  .edit-group {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .edit-group textarea {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    resize: none;
    min-height: 40px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .edit-button {
    background-color: #ff9800;
  }

  .delete-button {
    background-color: #f44336;
  }

  .edit-button:hover {
    background-color: #e68900;
  }

  .delete-button:hover {
    background-color: #d32f2f;
  }

  @media (max-width: 480px) {
    .container {
      padding: 15px;
    }

    .input-group {
      flex-direction: column;
      gap: 10px;
    }

    .edit-group {
      flex-direction: column;
    }

    .action-buttons {
      flex-direction: column;
    }

    button {
      padding: 10px;
      font-size: 14px;
    }

    textarea {
      font-size: 14px;
      padding: 10px;
    }
  }

  @media (min-width: 1024px) {
    .container {
      max-width: 1000px;
      padding: 30px;
    }

    textarea,
    button {
      padding: 14px;
      font-size: 18px;
    }

    li {
      padding: 18px;
      font-size: 16px;
    }
  }
</style>
