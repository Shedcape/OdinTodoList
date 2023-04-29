export default class Project {
  constructor(name, active = false, todos = []) {
    this.name = name;
    this.active = active;
    this.usedIds = [];
    this.todos = todos;
  }
  getNewTodoId() {
    let id = null;
    while (id === null || this.usedIds.includes(id)) {
      id = Math.floor(Math.random() * 10000);
    }
    this.usedIds.push(id);
    return id;
  }
  getTodo(id) {
    const todo = this.todos.find(todo => Number(todo.id) === id);
    console.log(id, todo, this.todos)
    return this.todos.find(todo => Number(todo.id) === id);
  }
}