//The purpose of this module is to solely handle everything related to the DOM
import projectImage from "../assets/project-management-icon-png-14.jpg"
import deleteImage from "../assets/trash-svgrepo-com.svg"
import TodoCard from "./components/TodoCard.js";
import TodoCardChange from "./components/TodoCardChange.js";

const domCreation = {
  newProjectPrompt() {
    const div = document.createElement('div');
    div.classList.add('add-project');
    div.innerHTML = `
      <input id="project-name" name="project-name">
      <button class="add-button">Add</button>
      <button class="cancel-button">Cancel</button>
    `
    return div;
  },
  createProjectDomElement(id, input, active) {
    const div = document.createElement('div');
    div.id = id;
    div.dataset.projectid = id;
    div.dataset.active = active ? "true" : "false";
    div.classList.add('project')
    div.innerHTML = `
      <img class="project-image" src=${projectImage} alt="Project">
      <h3 class="project-name" data-projectid="${id}">${input}</h3>
      <img class="delete-project" src=${deleteImage} data-deleteprojectid="${id}" alt="Delete Project">
    `
    return div;
  },
}

const domProjectManager = {
  newProjectPrompt() {
    if (document.getElementById('project-name')) return;
    const projectContainer = document.querySelector('.project-container')
    const div = domCreation.newProjectPrompt();
    projectContainer.appendChild(div);
  },
  removeNewProjectPrompt() {
    const projectContainer = document.querySelector('.project-container')
    projectContainer.removeChild(projectContainer.lastElementChild);
  },
  addToProjectDom(element) {
    const projectContainer = document.querySelector('.project-container')
    projectContainer.appendChild(element);
  },
  addProjectDomElement(id, input, active) {
    const projectContainer = document.querySelector('.project-container')
    const div = domCreation.createProjectDomElement(id, input, active);
    projectContainer.appendChild(div);
  }
}

const domTodoManager = {
  clearOutTodos() {
    const todoContainer = document.querySelector(".container");
    while (todoContainer.lastElementChild) {
      todoContainer.removeChild(todoContainer.lastElementChild)
    }
  },
  addTodoButton() {
    const todoContainer = document.querySelector(".container");
    const div = document.createElement('div');
    div.classList.add('add-todobuttoncontainer')
    div.innerHTML = `
      <button class="add-todoButton">Add todo</button>
    `
    todoContainer.appendChild(div);
  },
  loadTodo(projectid, todoData, container) {
    const todoCard = new TodoCard(projectid, todoData)
    container.appendChild(todoCard);
  },
  createTodo(projectid, todoData, container) {
    console.log(todoData)
    const todoCard = new TodoCardChange(projectid, todoData);
    container.appendChild(todoCard);
  },
  saveTodo(projectid, todo, container) {
    const todoElement = document.querySelector(`[data-containerfortodo="${todo.id}"]`)
    const nextSibling = todoElement.nextElementSibling;

    todoElement.remove();
    const todoCard = new TodoCard(projectid, todo);
    if (nextSibling) {
      container.insertBefore(todoCard, nextSibling)
    } else {
      container.appendChild(todoCard)
    }
  },
  changeTodo(projectid, todo, container) {
    const todoElement = document.querySelector(`[data-containerfortodo="${todo.id}"]`)
    const nextSibling = todoElement.nextElementSibling;
    todoElement.remove();
    const todoCard = new TodoCardChange(projectid, todo)
    if (nextSibling) {
      container.insertBefore(todoCard, nextSibling)
    } else {
      container.appendChild(todoCard);
    }
  },
  removeAddTodoButton() {
    const element = document.querySelector('.add-todobuttoncontainer');
    if (element) {
      element.remove();
    }
  },
}

export { domProjectManager, domTodoManager };