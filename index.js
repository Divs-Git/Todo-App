const todoDataList = document.getElementById("todo-data-listing");
const addInputField = document.getElementById("input-field");
const addBtn = document.getElementById("add-button");
const getPendingTodosBtn = document.getElementById("pending-todos-button");
let todosArr = [];

getPendingTodosBtn.addEventListener("click", () => {
  todosArr = todosArr.filter((el) => el.status !== "Finished");
  reRenderTodo();
});

addInputField.addEventListener("keyup", () => {
  const todoData = addInputField.value;
  if (todoData.length > 0) {
    addBtn.classList.remove("disabled");
  } else {
    if (!addBtn.classList.contains("disabled")) {
      addBtn.classList.add("disabled");
    }
  }
});

addBtn.addEventListener("click", () => {
  const todoData = addInputField.value;
  todoObj = {
    text: todoData,
    status: "In Progress",
    finishedButtonText: "Finish",
  };
  if (todoData.length > 0) {
    todosArr.push(todoObj);
    addTodo(todoObj, todosArr.length);
  }
  addInputField.value = "";
  addBtn.classList.add("disabled");
});

function reRenderTodo() {
  todoDataList.innerHTML = "";
  todosArr.forEach((el, idx) => {
    addTodo(el, idx + 1);
  });
}

function removeTodo(event) {
  const listKey = Number(event.target.getAttribute("list-key"));
  todosArr.splice(listKey, 1);
  reRenderTodo();
}

function finishTodo(event) {
  const listKey = Number(event.target.getAttribute("list-key"));
  if (todosArr[listKey].finishedButtonText === "Finish") {
    todosArr[listKey].status = "Finished";
    todosArr[listKey].finishedButtonText = "Undo";
  } else {
    todosArr[listKey].status = "In Progress";
    todosArr[listKey].finishedButtonText = "Finish";
  }

  todosArr.sort((a, b) => {
    if (a.status === "Finished") return 1;
    return -1;
  });

  reRenderTodo();
}

function editTodo(event) {
  const itemKey = Number(event.target.getAttribute("list-key"));
  const hiddenInput = document.querySelector(`input[list-key="${itemKey}"]`);
  const taskDiv = document.querySelector(`div[list-key="${itemKey}"]`);

  hiddenInput.type = "text";
  taskDiv.style.display = "none";
  hiddenInput.value = taskDiv.textContent;
}

function saveEdit(event) {
  const itemKey = Number(event.target.getAttribute("list-key"));
  const hiddenInput = document.querySelector(`input[list-key="${itemKey}"]`);
  const taskDiv = document.querySelector(`div[list-key="${itemKey}"]`);

  if (event.keyCode === 13) {
    todosArr[itemKey].text = hiddenInput.value;
    taskDiv.textContent = hiddenInput.value;
    hiddenInput.type = "hidden";
    taskDiv.style.display = "block";
  }
}

function addTodo(todo, todoNumber) {
  const rowDiv = document.createElement("div");
  const todoItemDiv = document.createElement("div");
  const todoNumberDiv = document.createElement("div");
  const todoTaskDiv = document.createElement("div");
  const hiddenInput = document.createElement("input");
  const todoStatusDiv = document.createElement("div");
  const todoActionsDiv = document.createElement("div");
  const deleteButton = document.createElement("button");
  const finishedButton = document.createElement("button");
  const editButton = document.createElement("button");
  const hrEle = document.createElement("hr");

  rowDiv.classList.add("row");
  todoItemDiv.classList.add(
    "todo-item",
    "text-muted",
    "d-flex",
    "flex-row",
    "justify-content-center",
    "align-items-center"
  );
  todoNumberDiv.classList.add("todo-no", "text-dark");
  todoTaskDiv.classList.add("todo-task");
  hiddenInput.classList.add("todo-task", "form-control", "me-3");
  hiddenInput.type = "hidden";
  todoStatusDiv.classList.add("todo-status");
  todoActionsDiv.classList.add("todo-actions");
  deleteButton.classList.add("btn", "btn-danger", "px-3", "me-2", "deleteBtn");
  finishedButton.classList.add(
    "btn",
    "btn-success",
    "px-3",
    "me-2",
    "finishedBtn"
  );
  editButton.classList.add("btn", "btn-warning", "px-3", "editBtn");

  todoNumberDiv.textContent = `${todoNumber}.`;
  todoTaskDiv.textContent = todo.text;
  todoStatusDiv.textContent = todo.status;
  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";
  finishedButton.textContent = todo.finishedButtonText;

  // add key to buttons for filter list
  deleteButton.setAttribute("list-key", todoNumber - 1);
  deleteButton.onclick = removeTodo;

  finishedButton.setAttribute("list-key", todoNumber - 1);
  finishedButton.onclick = finishTodo;

  editButton.setAttribute("list-key", todoNumber - 1);
  editButton.onclick = editTodo;

  hiddenInput.setAttribute("list-key", todoNumber - 1);
  hiddenInput.onkeydown = saveEdit;
  todoTaskDiv.setAttribute("list-key", todoNumber - 1);

  todoActionsDiv.appendChild(deleteButton);
  todoActionsDiv.appendChild(finishedButton);
  todoActionsDiv.appendChild(editButton);
  todoItemDiv.appendChild(todoNumberDiv);
  todoItemDiv.appendChild(todoTaskDiv);
  todoItemDiv.appendChild(hiddenInput);
  todoItemDiv.appendChild(todoStatusDiv);
  todoItemDiv.appendChild(todoActionsDiv);
  rowDiv.appendChild(todoItemDiv);
  rowDiv.appendChild(hrEle);

  todoDataList.appendChild(rowDiv);
}
