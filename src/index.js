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

const eventController = (() => {
  const addTodoButtonListener = () => {
    const addTodoButton = document.querySelector('.add-todobuttoncontainer')
    addTodoButton.addEventListener('click', () => todoController.addNewTodo())
  }
  const addSaveButtonListener = (todoid) => {
    const saveButton = document.querySelector(`[data-savetodoid="${todoid}"]`)
    saveButton.addEventListener('click', (e) => {
      const todoid = Number(e.target.dataset.todoid)
      const projectid = Number(e.target.dataset.projectid)
      todoController.saveTodo(todoid, projectid)
    })
  }
  const addChangeButtonListener = (todoid) => {
    const changeButton = document.querySelector(`[data-changetodoid="${todoid}"]`)
    changeButton.addEventListener('click', (e) => todoController.changeTodo(e))
  }
  const addDeleteButtonListener = (todoid) => {
    const deleteButton = document.querySelector(`[data-deletetodoid="${todoid}"]`)
    deleteButton.addEventListener('click', () => projectController.deleteTodoFromProject(Number(deleteButton.dataset.deletetodoid)))
  }
  const addNewProjectButtonListener = () => {
    document.querySelector('.add-button').addEventListener('click', projectController.addNewProject);
  }
  const cancelNewProjectListener = () => {
    document.querySelector('.cancel-button').addEventListener('click', domProjectManager.removeNewProjectPrompt)
  }
  const switchProjectListener = (node) => {
    node.addEventListener('click', (e) => projectController.switchProject(Number(e.target.dataset.projectid)));
  }
  const deleteProjectListener = (node) => {
    node.addEventListener('click', (e) => projectController.deleteProject(Number(e.target.dataset.deleteprojectid)))
  }
  return { addTodoButtonListener, addSaveButtonListener, addChangeButtonListener, addDeleteButtonListener, addNewProjectButtonListener, cancelNewProjectListener, switchProjectListener, deleteProjectListener }
})()

const projectController = (() => {
  const projectContainer = document.querySelector('.project-container')
  const addNewProjectPrompt = () => {
    domProjectManager.newProjectPrompt();
    eventController.addNewProjectButtonListener()
    eventController.cancelNewProjectListener();
  }
  const renderProjects = (rerender = false) => {
    const projects = projectsList.retrieveProjects();
    const todoContainer = document.querySelector('.container')
    if (rerender) {
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
        todoContainer.dataset.currentprojectid = index;
        todoController.loadProjectTodos(project.todos, index)
      }
    })
  }
  const addNewProject = () => {
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
  }
  const switchProject = (targetProjectId) => {
    const todoContainer = document.querySelector('.container')
    const currentProjectId = Number(todoContainer.dataset.currentprojectid)
    projectsList.deActivateProject(currentProjectId);
    projectsList.activateProject(targetProjectId)
    todoController.emptyContainer();
    todoContainer.dataset.currentprojectid = targetProjectId;
    projectController.renderProjects(true)
  }
  const loadProject = (projectid) => {
    const todos = projectsList.retrieveTodos(projectid);
    const todoContainer = document.querySelector('.container')
    todoContainer.dataset.currentprojectid = projectid;
    console.log(todos)
    if (todos.length === 0) {
      todoController.addNewTodoButton()
    } else {
      todoController.loadProjectTodos(todos, projectid)
    }
  }
  const deleteTodoFromProject = (todoid) => {
    const projectid = Number(document.querySelector('.container').dataset.currentprojectid)
    projectsList.removeToDo(projectid, todoid)
    todoController.clearTodos()
    projectController.loadProject(projectid)
  }
  const deleteProject = (projectid) => {
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
  return { addNewProjectPrompt, renderProjects, addNewProject, switchProject, loadProject, deleteTodoFromProject, deleteProject }
})()

const todoController = (() => {
  const clearTodos = () => {
    domTodoManager.clearOutTodos();
  }
  const addNewTodoButton = () => {
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();
  }
  const loadProjectTodos = (todoArray, projectid) => {
    const container = document.querySelector('.container')
    todoArray.forEach((todo) => {
      domTodoManager.loadTodo(projectid, todo, container)

      eventController.addChangeButtonListener(todo.id)
      eventController.addDeleteButtonListener(todo.id)
    })
    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener()
  }
  const loadTodo = (projectid, todo, container) => {
    domTodoManager.removeAddTodoButton()
    domTodoManager.loadTodo(projectid, todo, container)
    eventController.addChangeButtonListener(todo.id)
    eventController.addDeleteButtonListener(todo.id);

    domTodoManager.addTodoButton();
    eventController.addTodoButtonListener();
  }
  const addNewTodo = () => {
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
  }
  const saveTodo = (todoid, projectid) => {
    const container = document.querySelector('.container');
    const data = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`))
    const updatedTodo = new Todo(data[0].value, data[1].value, data[2].value, data[3].value, todoid)
    const todoIdx = projectsList.todoIndex(Number(projectid), Number(todoid));
    projectsList.updateTodo(projectid, todoIdx, updatedTodo, todoid);

    domTodoManager.saveTodo(projectid, updatedTodo, container)
    eventController.addChangeButtonListener(todoid);
    eventController.addDeleteButtonListener(todoid);
  }
  const changeTodo = (e) => {
    const container = document.querySelector('.container');
    const todoid = Number(e.target.dataset.todoid)
    const projectid = Number(e.target.dataset.projectid)
    const todo = projectsList.list[projectid].getTodo(todoid);
    domTodoManager.changeTodo(projectid, todo, container);
    eventController.addSaveButtonListener(todoid);
    eventController.addDeleteButtonListener(todoid);
  }
  const emptyContainer = () => {
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
  return { clearTodos, addNewTodoButton, loadProjectTodos, loadTodo, addNewTodo, saveTodo, changeTodo, emptyContainer }
})()


storageController.clear()
document.querySelector('.newProjectPromptButton').addEventListener('click', () => {
  projectController.addNewProjectPrompt();
})

window.onload = storageController.onStart();
projectController.renderProjects()

window.onbeforeunload = storageController.store()