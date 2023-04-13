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
      <h3 class="project-name">${input}</h3>
      <img class="delete-project" src=${deleteImage} alt="Delete Project">
    `
    return div;
  }

}

const domProjectManager = {
  newProjectPrompt() {
    if (document.getElementById('project-name')) return;
    const projectContainer = document.querySelector('.project-container')
    const div = domCreation.newProjectPrompt();
    console.log(projectContainer)
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

}

export { domProjectManager, domTodoManager };