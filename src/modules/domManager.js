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
  createTodo(projectid, todo) {
    const container = document.querySelector('.container');
    const div = document.createElement('div')
    div.classList.add('todoCard');
    div.classList.add('create-todo');
    const { title, description, dueDate, priority, id } = todo;
    console.log(todo, id)
    div.dataset.containerfortodo = id;
    div.innerHTML = `
    <div class="create-todo">
      <form class="formlayout" action="" data-projectid="${projectid}" data-todoid="${id}" data-todostatus="change">
        <input class="todoTitle createTitle" type="text" name="todotitle" id="todotitle" placeholder="Title of the Todo" data-inputfortodo="${id}" value="${title}">
        <p class="todoCategory">Description:</p>
        <textarea class="todoText" name="tododesc" id="tododesc" data-inputfortodo="${id}">${description}</textarea>
        <p class="todoCategory">Due date:</p>
        <input class="todoText" type="date" name="tododuedate" id="tododuedate" data-inputfortodo="${id}" value=${dueDate}>
        <p class="todoCategory">Priority:</p>
        <select class="todoText" name="todopriority" id="todopriority" data-inputfortodo="${id}" value=${priority}>
          <option value="Low" ${priority === "Low" && "selected"}>Low</option>
          <option value="Medium" ${priority === "Medium" && "selected"}>Medium</option>
          <option value="High" ${priority === "High" && "selected"}>High</option>
        </select>
      </form>
      <div class="todoControls">
        <button class="save-button" data-savetodoid="${id}" data-todoid="${id}" data-projectid="${projectid}">Save</button>
        <button class="delete-button" data-deletetodoid="${id}" data-todoid="${id}" data-projectid="${projectid}">Delete</button>
      </div>
    </div>`
    container.appendChild(div);
  },
  convertToCompleteTodo(todoid) {
    const data = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`));
    const div = document.querySelector(`[data-containerfortodo="${todoid}"]`)
    const projectid = Number(document.querySelector(`[data-todoid="${todoid}"]`).dataset.projectid)
    div.innerHTML = `
      <div class="create-todo">
        <div class="formlayout" data-projectid="${projectid}" data-todoid="${todoid}" data-todostatus="notchange">
          <h2 data-inputfortodo="${todoid}">${data[0].value}</h2>
          <p class="todoCategory">Description:</p>
          <p class="todoText" id="tododesc" data-inputfortodo="${todoid}">${data[1].value}</p>
          <p class="todoCategory">Due date:</p>
          <p class="todoText" data-inputfortodo="${todoid}">${data[2].value}</p>
          <p class="todoCategory">Priority:</p>
          <p class="todoText" data-inputfortodo="${todoid}">${data[3].value}</p>
        </div>
        <div class="todoControls">
          <button class="change-button" data-changetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Change</button>
          <button class="delete-button" data-deletetodoid="${todoid}" data-projectid="${projectid}"">Delete</button>
        </div>
      </div>
    `
  },
  convertToChangeTodo(todoid) {
    const data = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`))
    const div = document.querySelector(`[data-containerfortodo="${todoid}"]`)
    const projectid = Number(document.querySelector(`[data-todoid="${todoid}"]`).dataset.projectid)
    const priority = data[3].innerHTML;

    div.innerHTML = `
    <div class="create-todo">
      <form class="formlayout" action="" data-projectid="${projectid}" data-todoid="${todoid}" data-todostatus="change">
        <input class="todoTitle createTitle" type="text" name="todotitle" id="todotitle" placeholder="Title of the Todo" data-inputfortodo="${todoid}" value="${data[0].innerHTML}">
        <p class="todoCategory">Description:</p>
        <textarea class="todoText" name="tododesc" id="tododesc" data-inputfortodo="${todoid}">${data[1].innerHTML}</textarea>
        <p class="todoCategory">Due date:</p>
        <input class="todoText" type="date" name="tododuedate" id="tododuedate" data-inputfortodo="${todoid}" value=${data[2].innerHTML}>
        <p class="todoCategory">Priority:</p>
        <select class="todoText" name="todopriority" id="todopriority" data-inputfortodo="${todoid}" value=${data[3].innerHTML}>
          <option value="Low" ${priority === "Low" && "selected"}>Low</option>
          <option value="Medium" ${priority === "Medium" && "selected"}>Medium</option>
          <option value="High" ${priority === "High" && "selected"}>High</option>
        </select>
      </form>
      <div class="todoControls">
        <button class="save-button" data-savetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Save</button>
        <button class="delete-button" data-deletetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Delete</button>
      </div>
    </div>
`
  }

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