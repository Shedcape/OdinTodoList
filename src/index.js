import initializeDom from "./modules/initialize";
import ProjectsList from "./modules/ProjectsList";
import { domProjectManager, domTodoManager } from "./modules/domManager";
import "./reset.css";
import "./style.css";

initializeDom();


class Project {
  constructor(name, active = false) {
    this.name = name;
    this.active = active;
    this.todos = [];
  }
}
const dummyProject = { name: "Test", active: true, todos: [{ title: "Hi", description: "Call the electric company regarding the bill.", dueDate: "2023-04-14", priority: "Medium" }] }
let projectsList = new ProjectsList();
projectsList.addProject(dummyProject);

const storageController = {
  retrieve() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    console.log(projects)
  },
  store() {
    localStorage.setItem("projects", JSON.stringify(projectsList));
  },
  clear() {
    localStorage.clear()
  }
}
storageController.store();
storageController.retrieve();
storageController.clear();
const eventController = {
  addTodoButtonListener() {
    const addTodoButton = document.querySelector('.add-todobuttoncontainer')
    addTodoButton.addEventListener('click', () => todoController.addTodo(false, true))
  },
  addSaveButtonListener(todoid) {
    const saveButton = document.querySelector(`[data-savetodoid="${todoid}"]`)
    saveButton.addEventListener('click', (e) => {
      const todoid = Number(e.target.dataset.todoid)
      const projectid = Number(e.target.dataset.projectid)
      todoController.saveTodo(todoid, projectid)
    })
  },
  addChangeButtonListener(todoid) {
    const changeButton = document.querySelector(`[data-changetodoid="${todoid}"]`)
    changeButton.addEventListener('click', (e) => todoController.changeTodo(e))
  },
  addDeleteButtonListener(todoid) {
    const deleteButton = document.querySelector(`[data-deletetodoid="${todoid}"]`)
  },
  addNewProjectButtonListener() {
    document.querySelector('.add-button').addEventListener('click', projectController.addNewProject);
  },
  cancelNewProjectListener() {
    document.querySelector('.cancel-button').addEventListener('click', domProjectManager.removeNewProjectPrompt)
  },

}

const projectController = {
  addNewProjectPrompt() {
    domProjectManager.newProjectPrompt();
    eventController.addNewProjectButtonListener()
    eventController.cancelNewProjectListener();
  },
  addNewProject() {
    const input = document.getElementById('project-name').value
    if (input.length === 0) return;
    const id = projectsList.length;
    projectsList.addProject(new Project(input, true));
    domProjectManager.removeNewProjectPrompt();
    domProjectManager.addProjectDomElement(id, input);
    const newProjectElement = document.querySelector(`[data-projectid="${id}"]`);
    newProjectElement.children[1].addEventListener('click', (e) => {
      //Todo: Fill in the logic for switching between projects
      projectController.switchProject(e)
    })
    newProjectElement.children[2].addEventListener('click', (e) => {
      //Todo: Fill in the logic for deleting project. 
      todoController.clearTodos();
    })
  },
  switchProject(e) {
    const targetProjectId = Number(e.target.dataset.projectid)
    const todoContainer = document.querySelector('.container')
    const currentProjectId = Number(todoContainer.dataset.currentprojectid)
    projectsList.deActivateProject(currentProjectId);
    projectsList.activateProject(targetProjectId)
    todoController.emptyContainer();
    todoContainer.dataset.currentprojectid = targetProjectId;

    projectController.loadProject(targetProjectId);

  },
  loadProject(projectid) {
    const todos = projectsList.retrieveTodos(projectid);
    const todoContainer = document.querySelector('.container')
    todoContainer.dataset.currentprojectid = projectid;
    if (todos.length === 0) {
      todoController.addNewTodoButton()
    } else {
      todos.forEach(todo => todoController.addTodo(todo, false))
    }
  }
}

const todoController = {
  clearTodos() {
    domTodoManager.clearOutTodos();
  },
  addNewTodoButton() {
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();
  },
  addTodo(todoContent, change = true) {
    const projectid = projectsList.currentProject;
    const todoid = projectsList.todoLength(projectid)
    if (!todoContent) {
      todoContent = { title: "", description: "", dueDate: "", priority: "" }
    }
    domTodoManager.removeAddTodoButton()
    domTodoManager.createTodo(todoid, projectid, todoContent, change)
    projectsList.addToDo(projectid, todoContent)
    if (!change) {
      eventController.addChangeButtonListener(todoid)
    } else {
      eventController.addSaveButtonListener(todoid);
    }
    eventController.addDeleteButtonListener(todoid);
    const deleteButton = document.querySelector(`[data-deletetodoid="${todoid}"]`)
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();
  },
  saveTodo(todoid, projectid) {

    const test = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`))
    const updatedTodo = { title: test[0].value, description: test[1].value, dueDate: test[2].value, priority: test[3].value }
    projectsList.updateTodo(projectid, todoid, updatedTodo);

    domTodoManager.saveTodo(todoid)
    eventController.addChangeButtonListener(todoid);
    eventController.addDeleteButtonListener(todoid);
  },
  changeTodo(e) {
    const todoid = Number(e.target.dataset.todoid)
    const projectid = Number(e.target.dataset.projectid)
    domTodoManager.changeTodo(todoid);
    eventController.addSaveButtonListener(todoid);
    eventController.addDeleteButtonListener(todoid);
  },
  emptyContainer() {
    const change = Array.from(document.querySelectorAll(`[data-todostatus="change"]`))
    if (change.length > 0) {
      change.forEach(todo => {
        const todoid = Number(todo.dataset.todoid)
        const projectid = Number(todo.dataset.projectid)
        todoController.saveTodo(todoid, projectid);
      })
    }
    domTodoManager.clearOutTodos();
  }
}

document.querySelector('.newProjectPromptButton').addEventListener('click', () => {
  projectController.addNewProjectPrompt();
})
todoController.addNewTodoButton();
todoController.emptyContainer()
projectController.loadProject(0)