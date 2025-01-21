window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#username');
	const newTodoForm = document.querySelector('#new_todo_form');

	const username = localStorage.getItem('username') || "";

    nameInput.value = username;

	nameInput.addEventListener('change', (e) => 
    {
		localStorage.setItem('username', e.target.value);
	})

    newTodoForm.addEventListener("submit", (e) => 
    {
        e.preventDefault();

        const todo =
        {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    })

    DisplayTodos();
})

function DisplayTodos()
{
    const todoList = document.querySelector("#list_todo");

    todoList.innerHTML = "";

    todos.sort((b, a) => a.createdAt - b.createdAt).forEach(todo => 
    {
        const todoItem = document.createElement("div");
        todoItem.classList.add("item_todo");

        const label = document.createElement("label");
        const input = document.createElement("input");
        const span = document.createElement("span");
        const content = document.createElement("div");
        const options = document.createElement("div");
        const edit = document.createElement("button");
        const deleteButton = document.createElement("button");

        input.type = "checkbox";
        input.checked = todo.done;
        span.classList.add("bubble");

        if(todo.category == "Low Priority")
        {
            span.classList.add("low");
        }
        else
        {
            span.classList.add("high");
        }

        content.classList.add("content_todo");
        options.classList.add("options");
        edit.classList.add("edit");
        deleteButton.classList.add("delete");

        content.innerHTML = `<input type='text' value="${todo.content}" readonly>`;
        edit.innerHTML = "Edit";
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        options.appendChild(edit);
        options.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(options);

        todoList.appendChild(todoItem);

        if (todo.done)
        {
            todoItem.classList.add("done");
        }

        input.addEventListener("click", (e) =>
        {
            todo.done = e.target.checked;
            localStorage.setItem("todos", JSON.stringify(todos));
            
            if (todo.done)
            {
                todoItem.classList.add("done");
            }
            else
            {
                todoItem.classList.remove("done");
            }

            DisplayTodos();
        })

        edit.addEventListener("click", (e) =>
        {
            const input = content.querySelector("input");
            input.readOnly = !input.readOnly;
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener("blur", (e) =>
            {
                input.setAttribute("readonly", true);
                todo.content = e.target.value;
                localStorage.setItem("todos", JSON.stringify(todos));
                DisplayTodos();
            })
        })

        deleteButton.addEventListener("click", (e) =>
        {
            todos = todos.filter(t => t !== todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            DisplayTodos();
        })
    })

}