export default class ProjectsList {
  constructor(list = []) {
    this.list = list;
  }
  get length() {
    return this.list.length;
  }
  get currentProject() {
    const id = this.list.findIndex(project => project.active)
    return id;
  }
  todoIndex(projectid, todoid) {
    return this.list[projectid].todos.findIndex(todo => todo.id === todoid)
  }
  isActive(id) {
    return this.list[id].active
  }
  addProject(project) {
    this.list.push(project);
  }
  removeProject(id) {
    this.list.splice(id, 1);
  }
  saveTodos(projectId, todoList) {
    this.list[projectId].todos = todoList;
  }
  addToDo(projectId, toDo) {
    this.list[projectId].todos.push(toDo);
  }
  removeToDo(projectId, index) {
    this.list[projectId].todos.splice(index, 1);
  }
  updateTodo(projectid, todoid, todo) {
    this.list[projectid].todos.splice(todoid, 1, todo);
  }
  retrieveTodos(projectId) {
    const todos = this.list[projectId].todos;
    return todos;
  }
  retrieveProjectId(projectName) {
    return this.list.findIndex(project => project.name === projectName)
  }
  todoLength(projectid) {
    return this.list[projectid].todos.length;
  }
  activateProject(projectid) {
    this.list[projectid].active = true;
  }
  deActivateProject(projectid) {
    this.list[projectid].active = false;
  }
  retrieveProjects() {
    return this.list;
  }
}