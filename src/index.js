initialize();

import initialize from "./modules/initialize";
import ProjectsList from "./modules/ProjectsList";
import { domProjectManager, domTodoManager } from "./modules/domManager";
import "./reset.css";
import "./style.css";


class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}
let projectsList = new ProjectsList([]);

const addTodoButton = document.querySelector('.add-todoButton');
addTodoButton.addEventListener('click', (e) => {
  const container = document.querySelector('.container');
  const div = document.createElement('div')
  div.classList.add('todoCard');
  div.classList.add('create-todo');
  div.innerHTML = `
    <form class="todoCard create-todo" action="">
      <input class="todoTitle createTitle" type="text" name="todotitle" id="todotitle" placeholder="Title of the Todo">
      <p class="todoCategory">Description:</p>
      <textarea class="newtodoinput" name="tododesc" id="tododesc"></textarea>
      <p class="todoCategory">Due date:</p>
      <input class="newtodoinput" type="date" name="tododuedate" id="tododuedate">
      <p class="todoCategory">Priority:</p>
      <select class="priorityinput" name="todopriority" id="todopriority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit" class="add-button" id="submittodo">Add Todo</button>
    </form>`
  container.appendChild(div);
  console.log("success")
})

const projectController = {
  addNewProjectPrompt() {
    domProjectManager.newProjectPrompt();
    const projectPrompt = document.querySelector('.add-project');
    document.querySelector('.add-button').addEventListener('click', projectController.addNewProject);
    console.log("hi")
    document.querySelector('.cancel-button').addEventListener('click', domProjectManager.removeNewProjectPrompt)
  },
  addNewProject() {
    const input = document.getElementById('project-name').value
    if (input.length === 0) return;
    const id = projectsList.length;
    projectsList.addProject(new Project(input));
    domProjectManager.removeNewProjectPrompt();
    domProjectManager.addProjectDomElement(id, input);
    const newProjectElement = document.querySelector(`[data-projectid="${id}"]`);
    newProjectElement.childNodes[1].addEventListener('click', (e) => {
      //Todo: Fill in the logic for switching between projects
      console.log(e)
    })
    newProjectElement.childNodes[2].addEventListener('click', (e) => {
      //Todo: Fill in the logic for deleting project. 
      console.log(e)
    })
  }
}

document.querySelector('.newProjectPromptButton').addEventListener('click', () => {
  projectController.addNewProjectPrompt();
})