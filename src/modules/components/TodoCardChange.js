export default function TodoCardChange(projectid, todo) {
  const card = document.createElement('div');
  card.classList.add('todocard', 'create-todo');
  card.dataset.containerfortodo = todo.id;

  card.innerHTML = `
  <div class="create-todo">
    <form class="formlayout" action="" data-projectid="${projectid}" data-todoid="${todo.id}" data-todostatus="change">
      <input class="todoTitle createTitle" type="text" name="todotitle" id="todotitle" placeholder="Title of the Todo" data-inputfortodo="${todo.id}" value="${todo.title}">
      <p class="todoCategory">Description:</p>
      <textarea class="todoText" name="tododesc" id="tododesc" data-inputfortodo="${todo.id}">${todo.description}</textarea>
      <p class="todoCategory">Due date:</p>
      <input class="todoText" type="date" name="tododuedate" id="tododuedate" data-inputfortodo="${todo.id}" value=${todo.duedate}>
      <p class="todoCategory">Priority:</p>
      <select class="todoText" name="todopriority" id="todopriority" data-inputfortodo="${todo.id}" value=${todo.priority}>
        <option value="Low" ${todo.priority === "Low" && "selected"}>Low</option>
        <option value="Medium" ${todo.priority === "Medium" && "selected"}>Medium</option>
        <option value="High" ${todo.priority === "High" && "selected"}>High</option>
      </select>
    </form>
    <div class="todoControls">
      <button class="save-button" data-savetodoid="${todo.id}" data-todoid="${todo.id}" data-projectid="${projectid}">Save</button>
      <button class="delete-button" data-deletetodoid="${todo.id}" data-todoid="${todo.id}" data-projectid="${projectid}">Delete</button>
    </div>
  </div>
`
  return card;
}