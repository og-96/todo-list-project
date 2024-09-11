<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";

  let todos = [];

  let newTodo = "";

  function addTodo() {
    if (newTodo.trim() === "") return;
    todos = [...todos, { text: newTodo, done: false }];
    newTodo = "";

    localStorage.setItem("todos", JSON.stringify(todos));
  }
</script>

<main>
  <header>
    <h1>To Do List</h1>
  </header>

  <div>
    <p></p>
  </div>

  <section>
    <input type="text" name="todo" id="todoInput" bind:value={newTodo} />
    <button on:click={addTodo}>Add</button>
  </section>

  <section>
    <ul>
      {#each todos as todo, index}
        <li>
          <input type="text" bind:value={todo.text} />
          <button>X</button>
        </li>
      {/each}
    </ul>
  </section>
</main>

<style>
  input {
    width: 400px;
    height: 32px;
  }

  ul {
    list-style-type: none;
  }
</style>
