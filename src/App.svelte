<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  let todos = [];

  let newTodo = "";

  let editingIndex = null;

  let editingText = "";

  function addTodo() {
    if (newTodo.trim() === "") return;
    todos = [...todos, { text: newTodo, done: false }];
    newTodo = "";
  }

  function deleteTodo(index) {
    todos = todos.filter((_, i) => i !== index);
    saveTodos();
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function editTodoinit(index) {
    editingIndex = index;
    editingText = todos[index].text;
  }

  function cancelEdit() {
    editingIndex = null;
    editingText = "";
  }

  function editTodoSafe() {
    if (editingText.trim() === "") return;
    todos[editingIndex].text = editingText;
    editingIndex = null;
    editingText = "";
    saveTodos();
  }

  function toggleTodoDone(index) {
    todos[index].done = !todos[index].done;
    saveTodos();
  }
</script>

<header>
  <h1>To Do List</h1>
</header>

<div class="container">
  <div class="input-group">
    <input
      type="text"
      name="todo"
      id="todoInput"
      placeholder="Add new Todo"
      bind:value={newTodo}
    />
    <button on:click={addTodo}>Add</button>
  </div>

  <ul>
    {#each todos as todo, index}
      <li>
        {#if editingIndex === index}
          <div class="edit-group">
            <input type="text" bind:value={editingText} />
            <button on:click={editTodoSafe}>Safe</button>
            <button on:click={cancelEdit}>Cancel</button>
          </div>
        {:else}
          <div class="todo-item">
            <input
              type="checkbox"
              checked={todo.done}
              on:change={() => toggleTodoDone(index)}
            />
            <span class:done={todo.done}>{todo.text}</span>
          </div>
          <div class="action-buttons">
            <button class="edit-button" on:click={() => editTodoinit(index)}
              >Edit</button
            >
            <button class="delete-button" on:click={() => deleteTodo(index)}
              >Delete</button
            >
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</div>

<style>
  /* Header Styles */
  header {
    background-color: #6200ee;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  }

  /* Container Styles */
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Input and Button Styles */
  .input-group {
    display: flex;
    margin-bottom: 20px;
  }

  input[type="text"] {
    flex: 1;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #6200ee;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #3700b3;
  }

  /* List Styles */
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .done {
    text-decoration: line-through;
    color: gray;
  }

  .todo-item {
    display: flex;
    align-items: center;
    color: black;
  }

  .todo-item input[type="checkbox"] {
    margin-right: 10px;
  }

  .edit-group {
    display: flex;
    align-items: center;
  }

  .edit-group input[type="text"] {
    margin-right: 10px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .edit-group button {
    margin-left: 5px;
  }

  /* Button Styles for Actions */
  .action-buttons button {
    margin-left: 10px;
    padding: 5px 10px;
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
</style>
