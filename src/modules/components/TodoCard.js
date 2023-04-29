export default function TodoCard(projectid, todo) {
  const card = document.createElement('div');
  card.classList.add('todocard', 'create-todo');
  card.dataset.containerfortodo = todo.id;

  card.innerHTML = `
  <div class="create-todo">
  <div class="formlayout" data-projectid="${projectid}" data-todoid="${todo.id}" data-todostatus="notchange">
    <h2 data-inputfortodo="${todo.id}">${todo.title}</h2>
    <p class="todoCategory">Description:</p>
    <p class="todoText" id="tododesc" data-inputfortodo="${todo.id}">${todo.description}</p>
    <p class="todoCategory">Due date:</p>
    <p class="todoText" data-inputfortodo="${todo.id}">${todo.dueDate}</p>
    <p class="todoCategory">Priority:</p>
    <p class="todoText" data-inputfortodo="${todo.id}">${todo.priority}</p>
  </div>
  <div class="todoControls">
    <button class="change-button" data-changetodoid="${todo.id}" data-todoid="${todo.id}" data-projectid="${projectid}">Change</button>
    <button class="delete-button" data-deletetodoid="${todo.id}" data-projectid="${projectid}"">Delete</button>
  </div>
</div>
`
  return card;
}