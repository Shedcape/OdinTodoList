export default class ProjectsList {
  constructor(list) {
    this.list = list;
  }
  get length() {
    console.log(this.list)
    return this.list.length;
  }
  addProject(project) {
    this.list.push(project);
  }
  removeProject(id) {
    this.list.splice(id, 1);
  }
  saveTodos(projectId, todoList) {
    this.list[projectId].toDos = todoList;
  }
  addToDo(projectId, toDo) {
    this.list[projectId].toDos.push(toDo);
  }
  removeToDo(projectId, name) {
    const index = this.list[projectId].toDos.findIndex(x => x.name === name);
    this.list[projectId].toDos.splice(index, 1);
  }
  retrieveTodos(projectId) {
    const todos = this.list[projectId].toDos;
    return todos;
  }
  retrieveProjectId(projectName) {
    return this.list.findIndex(project => project.name === projectName)
  }
}