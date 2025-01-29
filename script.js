// Obtener referencias correctas a los elementos
var todoInput = document.getElementById('todo-input');
var todoList = document.getElementById('todos-container');
var addButton = document.getElementById('add-button');

addButton.addEventListener("click", function () {
    const taskTextValue = todoInput.value.trim(); // Obtener el texto del input y eliminar espacios extra

    if (taskTextValue === "") {
        alert("Por favor, ingresa una tarea."); // Evita agregar tareas vacías
        return;
    }

    // Crear el elemento <li>
    const li = document.createElement("li");
    li.className = "flex items-center justify-between w-full  p-2";

    // Crear el contenedor del checkbox y texto
    const label = document.createElement("label");
    label.className = "flex items-center";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-checkbox h-5 w-5 text-blue-500";

    // Texto de la tarea (usando el valor del input)
    const taskText = document.createElement("span");
    taskText.className = "text-gray-700 ml-2 mr-6 align-middle";
    taskText.textContent = taskTextValue;

    // Agregar checkbox y texto dentro del label
    label.appendChild(checkbox);
    label.appendChild(taskText);

    // Botón de eliminar
    const removeBtn = document.createElement("button");
    removeBtn.className = " remove ml-auto bg-red-500 text-white p-2 rounded-md hover:bg-red-600";
    removeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
    `;

    // Evento para eliminar la tarea
    removeBtn.addEventListener("click", function () {
        li.remove();
    });

    // Agregar elementos al <li>
    li.appendChild(label);
    li.appendChild(removeBtn);

    // Agregar <li> a la lista
    todoList.appendChild(li);

    // Limpiar el input después de agregar la tarea
    todoInput.value = "";
});