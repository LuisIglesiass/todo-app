const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todos-container');
const addButton = document.getElementById('add-button');

todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { 
        event.preventDefault(); 
        addButton.click(); 
    }
});

addButton.addEventListener("click", function () {
    const taskTextValue = todoInput.value.trim();

    if (taskTextValue === "") {
        alert("Please, enter a task.");
        return;
    }

    const listItems = todoList.querySelectorAll('li'); 
    const itemCount = listItems.length; 

    const inputRect = todoInput.getBoundingClientRect();
    const divRect = todoList.getBoundingClientRect();

    const startY = inputRect.top;
    const offsetY = divRect.top - inputRect.top;  

    const li = document.createElement("li");
    li.className = "flex items-center justify-between w-full p-2";
    li.style.position = "absolute";
    li.style.top = `${inputRect.top}px`;
    li.style.animation = `moveElementToList 0.65s ease-in-out`;
    let totalHeight = 0;
    for (let i = 0; i < itemCount; i++) {
        totalHeight += listItems[i].offsetHeight;
    }
    li.style.setProperty('--offsetY', `${offsetY + totalHeight}px`);

    const label = document.createElement("label");
    label.className = "flex items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-checkbox h-5 w-5 text-blue-500";

    const taskText = document.createElement("span");
    taskText.className = "text-gray-700 ml-2 mr-6 align-middle break-all text-left";
    taskText.textContent = taskTextValue;

    label.appendChild(checkbox);
    label.appendChild(taskText);

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove ml-auto bg-red-500 text-white p-2 rounded-md hover:bg-red-600";
    removeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    `;

    removeBtn.addEventListener("click", function () {
        const li = this.parentElement;
        const nextSiblings = Array.from(li.nextElementSibling ? li.nextElementSibling.parentElement.children : []);
        const index = nextSiblings.indexOf(li);

        li.style.animation = `removeTask 1s ease-in-out`;
        li.addEventListener("animationend", () => {
            li.remove();
        });

        nextSiblings.slice(index + 1).forEach(sibling => {
            sibling.style.setProperty('--taskHeight', `${li.offsetHeight}px`);
            sibling.style.animation = `shiftUp 1s ease-in-out`;
        });
    });

    li.appendChild(label);
    li.appendChild(removeBtn);
    todoList.appendChild(li);
    todoInput.value = "";

    li.addEventListener("animationend", () => {
        li.style.position = "static";
    });
});