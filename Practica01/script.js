let tasks = [];

const taskToDoContainer = document.getElementById("todoListContainer");
const doneListContainer = document.getElementById("doneListContainer");
const addTaskButton = document.getElementById("addTaskButton");
const addTaskInput = document.getElementById("addTaskInput");
addTaskButton.addEventListener("click", (e) => {
	e.preventDefault();
	addNewTask(addTaskInput.value);
	addTaskInput.value = "";

});

function syncTasksToLocalStorage() {
	localStorage.setItem("tareas", JSON.stringify(tasks));
}

function addNewTask(text) {
	const task = {
		id: tasks.length,
		value: text,
		done: false
	};
	tasks.push(task);
	addTaskToContainer(task);
	syncTasksToLocalStorage();
}
function doneTask(id) {
	const task = tasks.find((task) => task.id === id);
	task.done = true;
	removeTaskFromContainer(id);
	addTaskToContainer(task);
	syncTasksToLocalStorage();
}

function addTaskToContainer({ id, value, done }) {
	const container = done ? doneListContainer : taskToDoContainer;

	container.innerHTML += `
	<div class="todo-item ${done ? 'done' : ''}" id="task-item-${id}" onclick="doneTask(${id})">
		<input type="checkbox" name="" ${done ? 'checked disabled' : ''} />
		<label for="">${value}</label>
	</div>`;
}
function removeTaskFromContainer(id) {
	const taskItem = document.getElementById(`task-item-${id}`);
	taskItem.remove();
}
function init() {
	const today = new Date();

	const months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	];

	document.getElementById("fecha").innerHTML = today.getDate() + " de " + months[today.getMonth()];

	if (localStorage.getItem("tareas")) {
		tasks = JSON.parse(localStorage.getItem("tareas"));
		tasks.forEach((task) => {
			addTaskToContainer(task);
		});
	} else {
		tasks = [];
		syncTasksToLocalStorage();
	}
}
init();
