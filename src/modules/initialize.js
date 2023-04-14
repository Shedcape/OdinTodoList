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
      <div class="todoCard create-todo">
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
        </form>
      </div>
      <div class="todoCard">
        <fieldset>
          <input class="todoTitle" type="text" name="title" value="Test title">
          <p class="todoCategory">Description:</p>
          <textarea class="todoText">Test</textarea>
          <p class="todoCategory">Due Date:</p>
          <input class="todoText" type="text" name="due date" value="2023-04-11">
          <p class="todoCategory">Priority:</p>
          <select class="todoText">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <div class="todoControls">
            <button>Save/Change</button>
            <button>Delete</button>
          </div>
        </fieldset>
      </div>
    </div>
    <footer>
      By Shedcape
    </footer>`
}