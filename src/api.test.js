const nock = require('nock');
const { fetchTodos, addTodoApi, deleteTodoApi, updateTodoApi } = require('./api.cjs.js');

const API_URL = 'http://localhost:3000/todos';

describe('API Tests', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    test('should fetch todos successfully', async () => {
        const mockTodos = [{ id: 1, text: 'Test Todo', done: false }];

        // Simuliere GET /todos
        nock('http://localhost:3000')
            .get('/todos')
            .reply(200, mockTodos);

        const todos = await fetchTodos();
        expect(todos).toEqual(mockTodos);
    });

    test('should throw error when fetching todos fails', async () => {
        // Simuliere einen Fehler bei GET /todos
        nock('http://localhost:3000')
            .get('/todos')
            .reply(500);

        await expect(fetchTodos()).rejects.toThrow('Failed to fetch todos');
    });

    test('should add a new todo successfully', async () => {
        const newTodo = 'New Test Todo';
        const mockResponse = { id: 1, text: newTodo, done: false };

        // Simuliere POST /todos
        nock(API_URL)
            .post('', { text: newTodo, done: false })
            .reply(201, mockResponse);

        const response = await addTodoApi(newTodo);
        expect(response).toEqual(mockResponse);
    });

    test('should throw error when adding a todo fails', async () => {
        const newTodo = 'New Test Todo';

        // Simuliere einen Fehler bei POST /todos
        nock(API_URL)
            .post('')
            .reply(500);

        await expect(addTodoApi(newTodo)).rejects.toThrow('Failed to add todo');
    });

    test('should delete a todo successfully', async () => {
        const todoId = 1;

        // Simuliere DELETE /todos/:id
        nock(API_URL)
            .delete(`/${todoId}`)
            .reply(200);

        await expect(deleteTodoApi(todoId)).resolves.toBeUndefined();
    });

    test('should throw error when deleting a todo fails', async () => {
        const todoId = 1;

        // Simuliere einen Fehler bei DELETE /todos/:id
        nock(API_URL)
            .delete(`/${todoId}`)
            .reply(500);

        await expect(deleteTodoApi(todoId)).rejects.toThrow('Failed to delete todo');
    });

    test('should update a todo successfully', async () => {
        const todoId = 1;
        const updatedTodo = { text: 'Updated Todo', done: true };
        const mockResponse = { id: todoId, ...updatedTodo };

        // Simuliere PUT /todos/:id
        nock(API_URL)
            .put(`/${todoId}`, updatedTodo)
            .reply(200, mockResponse);

        const response = await updateTodoApi(todoId, updatedTodo);
        expect(response).toEqual(mockResponse);
    });

    test('should throw error when updating a todo fails', async () => {
        const todoId = 1;
        const updatedTodo = { text: 'Updated Todo', done: true };

        // Simuliere einen Fehler bei PUT /todos/:id
        nock(API_URL)
            .put(`/${todoId}`, updatedTodo)
            .reply(500);

        await expect(updateTodoApi(todoId, updatedTodo)).rejects.toThrow('Failed to update todo');
    });
});