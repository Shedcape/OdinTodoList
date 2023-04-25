import logo from "../assets/things-to-do-icon-16.jpg"
import newProjectImage from "../assets/plus-icon-17.jpg"

export default function initializeDom(projectId = 0) {
  const body = document.querySelector('body');
  body.innerHTML = `
    <header>
      <img class="logo" src="${logo}" alt="logo">
      <h1 class="logo-text">To Do Central</h1>
    </header>
    <aside>
      <h2 class="project-text">Projects</h2>
      <img class="newProjectPromptButton" src="${newProjectImage}" alt="New Project">
      <div class="project-container" >
      </div>
    </aside>
    <div class="container" data-currentprojectid=${projectId}>
    </div>
    <footer>
      By Shedcape
    </footer>`
}