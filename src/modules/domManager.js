//The purpose of this module is to solely handle everything related to the DOM
import projectImage from "../assets/project-management-icon-png-14.jpg"
import deleteImage from "../assets/trash-svgrepo-com.svg"

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
  createProjectDomElement(id, input) {
    const div = document.createElement('div');
    div.id = id;
    div.dataset.projectid = id;
    div.classList.add('project')
    div.innerHTML = `
      <img class="project-image" src=${projectImage} alt="Project">
      <h3 class="project-name" data-projectid="${id}">${input}</h3>
      <img class="delete-project" src=${deleteImage} alt="Delete Project">
    `
    return div;
  },
  createTodo(todoid, projectid, todoContent) {
    const container = document.querySelector('.container');
    const div = document.createElement('div')
    div.classList.add('todoCard');
    div.classList.add('create-todo');
    div.dataset.containerfortodo = todoid;
    const { title, description, dueDate, priority } = todoContent;
    div.innerHTML = `
    <div class="create-todo">
      <form class="formlayout" action="" data-projectid="${projectid}" data-todoid="${todoid}" data-todostatus="change">
        <input class="todoTitle createTitle" type="text" name="todotitle" id="todotitle" placeholder="Title of the Todo" data-inputfortodo="${todoid}" value="${title}">
        <p class="todoCategory">Description:</p>
        <textarea class="todoText" name="tododesc" id="tododesc" data-inputfortodo="${todoid}">${description}</textarea>
        <p class="todoCategory">Due date:</p>
        <input class="todoText" type="date" name="tododuedate" id="tododuedate" data-inputfortodo="${todoid}" value=${dueDate}>
        <p class="todoCategory">Priority:</p>
        <select class="todoText" name="todopriority" id="todopriority" data-inputfortodo="${todoid}" value=${priority}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </form>
      <div class="todoControls">
        <button data-savetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Save</button>
        <button data-deletetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Delete</button>
      </div>
    </div>`
    container.appendChild(div);
  },
  convertToCompleteTodo(todoid) {
    const test = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`));
    const div = document.querySelector(`[data-containerfortodo="${todoid}"]`)
    const projectid = Number(document.querySelector(`[data-todoid="${todoid}"]`).dataset.projectid)
    div.innerHTML = `
      <div class="create-todo">
        <div class="formlayout" data-projectid="${projectid}" data-todoid="${todoid}" data-todostatus="notchange">
          <h2 data-inputfortodo="${todoid}">${test[0].value}</h2>
          <p class="todoCategory">Description:</p>
          <p class="todoText" id="tododesc" data-inputfortodo="${todoid}">${test[1].value}</p>
          <p class="todoCategory">Due date:</p>
          <p class="todoText" data-inputfortodo="${todoid}">${test[2].value}</p>
          <p class="todoCategory">Priority:</p>
          <p class="todoText" data-inputfortodo="${todoid}">${test[3].value}</p>
        </div>
        <div class="todoControls">
          <button data-changetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Change</button>
          <button data-deletetodoid="${todoid} data-projectid="${projectid}"">Delete</button>
        </div>
      </div>
    `
  },
  convertToChangeTodo(todoid) {
    const test = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`))
    const div = document.querySelector(`[data-containerfortodo="${todoid}"]`)
    const projectid = Number(document.querySelector(`[data-todoid="${todoid}"]`).dataset.projectid)

    div.innerHTML = `
    <div class="create-todo">
      <form class="formlayout" action="" data-projectid="${projectid}" data-todoid="${todoid}" data-todostatus="change">
        <input class="todoTitle createTitle" type="text" name="todotitle" id="todotitle" placeholder="Title of the Todo" data-inputfortodo="${todoid}" value="${test[0].innerHTML}">
        <p class="todoCategory">Description:</p>
        <textarea class="todoText" name="tododesc" id="tododesc" data-inputfortodo="${todoid}">${test[1].innerHTML}</textarea>
        <p class="todoCategory">Due date:</p>
        <input class="todoText" type="date" name="tododuedate" id="tododuedate" data-inputfortodo="${todoid}" value=${test[2].innerHTML}>
        <p class="todoCategory">Priority:</p>
        <select class="todoText" name="todopriority" id="todopriority" data-inputfortodo="${todoid}" value=${test[3].innerHTML}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </form>
      <div class="todoControls">
        <button data-savetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Save</button>
        <button data-deletetodoid="${todoid}" data-todoid="${todoid}" data-projectid="${projectid}">Delete</button>
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
  addProjectDomElement(id, input) {
    const projectContainer = document.querySelector('.project-container')
    const div = domCreation.createProjectDomElement(id, input);
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
  createTodo(todoid, projectid, todoContent, change) {
    domCreation.createTodo(todoid, projectid, todoContent)
    if (!change) {
      domCreation.convertToCompleteTodo(todoid);
    }
  },
  saveTodo(todoid) {
    domCreation.convertToCompleteTodo(todoid);
  },
  changeTodo(todoid) {
    domCreation.convertToChangeTodo(todoid);
  },
  removeAddTodoButton() {
    const todoContainer = document.querySelector(".container");
    if (todoContainer.lastElementChild) {
      todoContainer.removeChild(todoContainer.lastElementChild);
    }

  }
}

export { domProjectManager, domTodoManager };