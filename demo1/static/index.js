async function getTodos() {
  const todos = await fetch("http://localhost:8080/get-all-todos");
  const todosData = await todos.json();
  const ul = document.querySelector("ul");
  if (!todosData || todosData.length === 0) {
    ul.innerHTML = "<li>No todos found</li>";
    return;
  }
  ul.innerHTML = "";
  todosData.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span id="name1-${todo.id}" style="${
      todo.completed ? "text-decoration: line-through;" : ""
    }>${todo.name}</span>
      <span id="description1-${todo.id}" style="${
      todo.completed ? "text-decoration: line-through;" : ""
    }>${todo.description}</span>
      <form onsubmit="event.preventDefault();handleUpdate('${
        todo.id
      }')" class="update-form">
        <input type="text" name="name" placeholder="${todo.name}" id="name-${
      todo.id
    }" />
        <input type="text" name="description" placeholder="${
          todo.description
        }" id="description-${todo.id}" />
        <button type="submit">确认</button>
      </form>
      <button onclick="handleFinished('${todo.id}')">完成</button>
      <button onclick="handleDisplay('${todo.id}')">更新</button>
      <button onclick="handleDelete('${todo.id}')">删除</button>

    `;
    ul.appendChild(li);
  });
}

getTodos();

// create todo
async function createTodo() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const todo = await fetch("http://localhost:8080/create", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      description: formData.get("description"),
    }),
  });

  form.reset();
  getTodos();
}

// update todo
async function handleDisplay(id) {
  const form = document.querySelector(`#update-form-${id}`);
  form.style.display = form.style.display === "none" ? "block" : "none";
}
async function handleUpdate(id) {
  const nameInput = document.querySelector(`#name-${id}`).value;
  const descriptionInput = document.querySelector(`#description-${id}`).value;
  const todo = await fetch("http://localhost:8080/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: nameInput,
      description: descriptionInput,
      completed: false,
    }),
  });
  getTodos();
  handleDisplay(id);
}

// delete todo
async function handleDelete(id) {
  await fetch("http://localhost:8080/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  });
  getTodos();
}

// finished todo
async function handleFinished(id) {
  const name = document.querySelector(`#name1-${id}`).textContent;
  const description = document.querySelector(`#description1-${id}`).textContent;
  await fetch("http://localhost:8080/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: name,
      description: description,
      completed: true,
    }),
  });
  getTodos();
}
