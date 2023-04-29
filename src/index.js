import initializeDom from "./modules/initialize";
import ProjectsList from "./modules/ProjectsList";
import { domProjectManager, domTodoManager } from "./modules/domManager";
import "./reset.css";
import "./style.css";
import Todo from "./modules/components/Todo.js"
import Project from "./modules/components/Project.js"

initializeDom();

let projectsList = new ProjectsList();
const date = new Date()

const storageController = {
  dummyProjects: [new Project("Moving", false, [new Todo("Book moving company", "Call the moving company to book them for the move on Sunday.", `${date.toISOString().slice(0, 10)}`, "High", "946"), new Todo("Clean the house", "Clean our old house thoroughly.", "2023-05-13", "High", "404")]), new Project("Test", false, [new Todo("Test", "Call the moving company to book them for the move on Sunday.", "2023-05-14", "High", "456"), new Todo("Clean the house", "Clean our  house thoroughly.", `${date.toISOString().slice(0, 10)}`, "High", "889")])],
  retrieve() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    console.log(projects)
    return projects;
  },
  store() {
    localStorage.setItem("projects", JSON.stringify(projectsList));
  },
  clear() {
    localStorage.clear()
  },
  onStart() {
    if (localStorage.length > 0) {
      const projects = storageController.retrieve();
      console.log(projects)
      projectsList = new ProjectsList(projects.list)
    } else {
      projectsList = new ProjectsList(storageController.dummyProjects)
    }
  }
}
const eventController = {
  addTodoButtonListener() {
    const addTodoButton = document.querySelector('.add-todobuttoncontainer')
    addTodoButton.addEventListener('click', () => todoController.addNewTodo())
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
    node.addEventListener('click', (e) => projectController.deleteProject(Number(e.target.dataset.deleteprojectid)))
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
    //If no project is active, default to the first project.
    if (!projects.some(project => project.active)) projectsList.activateProject(0)
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
  deleteProject(projectid) {
    const active = projectsList.isActive(projectid)

    //Removes the project from the list of projects
    projectsList.removeProject(projectid)

    //If the project was the active one, it automatically switches to the first project, if there is one.
    if (active) {
      const numberOfProjects = projectsList.length
      if (numberOfProjects > 0) {
        document.querySelector('.container').dataset.currentprojectid = 0;
        projectController.switchProject(0)
      } else {
        document.querySelector('.container').dataset.currentprojectid = "";
        const projectContainer = document.querySelector('.project-container')
        while (projectContainer.lastElementChild) {
          projectContainer.removeChild(projectContainer.lastElementChild)
        }
        todoController.emptyContainer()
      }
    } else {
      //Else if it's not the active project, it rerenders everything.
      todoController.emptyContainer()
      projectController.renderProjects(true)
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
  loadProjectTodos(todoArray, projectid) {
    const container = document.querySelector('.container')
    todoArray.forEach((todo) => {
      domTodoManager.loadTodo(projectid, todo, container)
      console.log(todo.id)
      eventController.addChangeButtonListener(todo.id)
      eventController.addDeleteButtonListener(todo.id)
    })
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener()
  },
  loadTodo(projectid, todo, container) {
    domTodoManager.removeAddTodoButton()
    domTodoManager.loadTodo(projectid, todo, container)
    eventController.addChangeButtonListener(todo.id)
    eventController.addDeleteButtonListener(todo.id);

    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();
  },
  addNewTodo() {
    const projectid = projectsList.currentProject;
    const todoid = projectsList.list[projectid].getNewTodoId();
    const container = document.querySelector('.container');
    const todo = new Todo("", "", "", "", todoid)

    projectsList.addToDo(projectid, todo)

    domTodoManager.removeAddTodoButton();
    domTodoManager.createTodo(projectid, todo, container)

    eventController.addSaveButtonListener(todo.id);
    eventController.addDeleteButtonListener(todo.id);

    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();

  },
  addTodo(todo, change = true, container = null) {
    if (!container) {
      container = document.querySelector('.container')
    }
    const projectid = projectsList.currentProject;
    console.log(projectid)
    const todoid = projectsList.list[projectid].getNewTodoId();
    if (!todo) {
      todo = new Todo("", "", "", "", todoid)
    }
    domTodoManager.removeAddTodoButton()
    domTodoManager.createTodo(projectid, todo, container)
    if (!change) {
      eventController.addChangeButtonListener(todo.id)
    } else {
      eventController.addSaveButtonListener(todo.id);
      projectsList.addToDo(projectid, todo)
    }
    eventController.addDeleteButtonListener(todo.id);
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();
  },
  saveTodo(todoid, projectid) {
    const container = document.querySelector('.container');
    const data = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`))
    const updatedTodo = new Todo(data[0].value, data[1].value, data[2].value, data[3].value, todoid)
    const todoIdx = projectsList.todoIndex(Number(projectid), Number(todoid));
    projectsList.updateTodo(projectid, todoIdx, updatedTodo, todoid);

    domTodoManager.saveTodo(projectid, updatedTodo, container)
    eventController.addChangeButtonListener(todoid);
    eventController.addDeleteButtonListener(todoid);
  },
  changeTodo(e) {
    const container = document.querySelector('.container');
    const todoid = Number(e.target.dataset.todoid)
    const projectid = Number(e.target.dataset.projectid)
    const todo = projectsList.list[projectid].getTodo(todoid);
    domTodoManager.changeTodo(projectid, todo, container);
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
storageController.clear()
document.querySelector('.newProjectPromptButton').addEventListener('click', () => {
  projectController.addNewProjectPrompt();
})

window.onload = storageController.onStart();
projectController.renderProjects()

window.onbeforeunload = storageController.store()