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
let projectsList = new ProjectsList();
const dummyProject = { name: "Default", active: false, todos: [{ title: "Hi", description: "Call the electric company regarding the bill.", dueDate: "2023-04-14", priority: "Medium" }] }
const dummyProject2 = { name: "Default2", active: true, todos: [{ title: "Yo", description: "How you doin?.", dueDate: "2023-04-14", priority: "Medium" }] }

projectsList.addProject(dummyProject);
projectsList.addProject(dummyProject2);

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
    deleteButton.addEventListener('click', () => projectController.deleteTodoFromProject(Number(deleteButton.dataset.deletetodoid)))
  },
  addNewProjectButtonListener() {
    document.querySelector('.add-button').addEventListener('click', projectController.addNewProject);
  },
  cancelNewProjectListener() {
    document.querySelector('.cancel-button').addEventListener('click', domProjectManager.removeNewProjectPrompt)
  },
  switchProjectListener(node) {
    node.addEventListener('click', (e) => projectController.switchProject(Number(e.target.dataset.projectid)));
  },
  deleteProjectListener(node) {
    //Note to self: Delete project logic missing. 
    node.addEventListener('click', todoController.clearTodos)
  }
}

const projectController = {
  addNewProjectPrompt() {
    domProjectManager.newProjectPrompt();
    eventController.addNewProjectButtonListener()
    eventController.cancelNewProjectListener();
  },
  renderProjects(rerender = false) {
    const projects = projectsList.retrieveProjects();

    if (rerender) {
      const projectContainer = document.querySelector('.project-container')
      while (projectContainer.lastElementChild) {
        projectContainer.removeChild(projectContainer.lastElementChild)
      }
    }

    if (projects.length === 0) return;

    projects.forEach((project, index) => {
      domProjectManager.addProjectDomElement(index, project.name, project.active);
      const newProjectElement = document.querySelector(`[data-projectid="${index}"]`);
      eventController.switchProjectListener(newProjectElement.children[1])
      eventController.deleteProjectListener(newProjectElement.children[2])

      if (project.active) {
        const todoContainer = document.querySelector('.container')
        todoContainer.dataset.currentprojectid = index;
        todoController.loadProjectTodos(project.todos, index)
      }
    })
  },
  addNewProject() {
    const input = document.getElementById('project-name').value
    if (input.length === 0) return;
    const id = projectsList.length;
    projectsList.addProject(new Project(input, true));
    domProjectManager.removeNewProjectPrompt();
    domProjectManager.addProjectDomElement(id, input, true);
    const newProjectElement = document.querySelector(`[data-projectid="${id}"]`);
    eventController.switchProjectListener(newProjectElement.children[1])
    eventController.deleteProjectListener(newProjectElement.children[2])

    projectController.switchProject(id)

  },
  switchProject(targetProjectId) {
    const todoContainer = document.querySelector('.container')
    const currentProjectId = Number(todoContainer.dataset.currentprojectid)
    projectsList.deActivateProject(currentProjectId);
    projectsList.activateProject(targetProjectId)
    todoController.emptyContainer();
    todoContainer.dataset.currentprojectid = targetProjectId;
    projectController.renderProjects(true)
  },
  loadProject(projectid) {
    const todos = projectsList.retrieveTodos(projectid);
    const todoContainer = document.querySelector('.container')
    todoContainer.dataset.currentprojectid = projectid;
    console.log(todos)
    if (todos.length === 0) {
      todoController.addNewTodoButton()
    } else {
      todoController.loadProjectTodos(todos, projectid)
    }
  },
  deleteTodoFromProject(todoid) {
    const projectid = Number(document.querySelector('.container').dataset.currentprojectid)
    projectsList.removeToDo(projectid, todoid)
    todoController.clearTodos()
    projectController.loadProject(projectid)
  },
  deleteProject() {
    //Note to self: Missing logic!!
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
  loadProjectTodos(todoArray, projectid) {
    todoArray.forEach((todo, index) => {
      domTodoManager.createTodo(index, projectid, todo, false)
      eventController.addChangeButtonListener(index)
      eventController.addDeleteButtonListener(index)
    })
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener()
  },
  addTodo(todoContent, change = true) {
    const projectid = projectsList.currentProject;
    const todoid = projectsList.todoLength(projectid)
    if (!todoContent) {
      todoContent = { title: "", description: "", dueDate: "", priority: "" }
    }
    domTodoManager.removeAddTodoButton()
    domTodoManager.createTodo(todoid, projectid, todoContent, change)
    if (!change) {
      eventController.addChangeButtonListener(todoid)
    } else {
      eventController.addSaveButtonListener(todoid);
      projectsList.addToDo(projectid, todoContent)
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
  },
}

document.querySelector('.newProjectPromptButton').addEventListener('click', () => {
  projectController.addNewProjectPrompt();
})
todoController.addNewTodoButton();
todoController.emptyContainer()

projectController.renderProjects()

