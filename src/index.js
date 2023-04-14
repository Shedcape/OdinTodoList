import initialize from "./modules/initialize";
import ProjectsList from "./modules/ProjectsList";
import { domProjectManager, domTodoManager } from "./modules/domManager";
import "./reset.css";
import "./style.css";

initialize();


class Project {
  constructor(name, active = false) {
    this.name = name;
    this.active = active;
    this.todos = [];
  }
}
const dummyProject = [{ name: "Test", active: true, todos: [{ title: "Hi", description: "Call the electric company regarding the bill.", dueDate: "2023-04-14", priority: "Medium" }] }]
let projectsList = new ProjectsList(dummyProject);

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
    projectsList.addProject(new Project(input, true));
    domProjectManager.removeNewProjectPrompt();
    domProjectManager.addProjectDomElement(id, input);
    const newProjectElement = document.querySelector(`[data-projectid="${id}"]`);
    newProjectElement.children[1].addEventListener('click', (e) => {
      //Todo: Fill in the logic for switching between projects
      console.log(e)
      projectController.switchProject()
    })
    newProjectElement.children[2].addEventListener('click', (e) => {
      //Todo: Fill in the logic for deleting project. 
      console.log(e)
      todoController.clearTodos();
    })
    console.log(projectsList.currentProject)
  },
  switchProject() {
    const todoContainer = document.querySelector('.container')
    console.log(todoContainer)
    console.log(todoContainer.dataset.currentprojectid)
    const currentProjectId = Number(todoContainer.dataset.currentprojectid)

  }
}

const todoController = {
  clearTodos() {
    domTodoManager.clearOutTodos();
  },
  addNewTodoButton() {
    domTodoManager.addTodoButton();
    const addTodoButton = document.querySelector('.add-todoButton');
    addTodoButton.addEventListener('click', todoController.addNewTodo)
  },
  addTodo() {
    const projectid = projectsList.currentProject;
    const todoid = projectsList.todoLength(projectid)
    console.log(projectid, todoid)
    const todoContent = { title: "", description: "", dueDate: "", priority: "" }
    domTodoManager.createTodo(todoid, projectid, todoContent)
    projectsList.addToDo(projectid, todoContent)
    const saveButton = document.querySelector(`[data-savetodoid="${todoid}"]`)
    saveButton.addEventListener('click', (e) => todoController.saveTodo(e))
    const deleteButton = document.querySelector(`[data-deletetodoid="${todoid}"]`)
  },
  saveTodo(e) {
    console.log(e)
    console.log(e.target)
    console.log(e.target.dataset.todoid)
    const todoid = Number(e.target.dataset.todoid)
    const projectid = Number(e.target.dataset.projectid)

    const test = Array.from(document.querySelectorAll(`[data-inputfortodo="${todoid}"]`))
    const updatedTodo = { title: test[0].value, description: test[1].value, dueDate: test[2].value, priority: test[3].value }
    projectsList.updateTodo(projectid, todoid, updatedTodo);
    console.log(projectsList.retrieveTodos(projectid))
    domTodoManager.saveTodo(todoid)
  }
}

document.querySelector('.newProjectPromptButton').addEventListener('click', () => {
  projectController.addNewProjectPrompt();
})
todoController.addTodo()