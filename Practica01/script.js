let tasks = [];

const done = new Audio("done.mp3");
const undone = new Audio("undone.mp3");
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
function toggleDoneTask(id) {
	const task = tasks.find((task) => task.id === id);
	task.done = !task.done;

	_ = task.done ? done.play() : undone.play();

	removeTaskFromContainer(id);
	addTaskToContainer(task);
	syncTasksToLocalStorage();
}

function addTaskToContainer({ id, value, done }) {
	const container = done ? doneListContainer : taskToDoContainer;

	container.innerHTML += `
	<div class="todo-item ${done ? 'done' : ''}" id="task-item-${id}" onclick="toggleDoneTask(${id})">
		<input type="checkbox" name="" ${done ? 'checked' : ''} />
		<label for="">${value}</label>
	</div>`;
}
function removeTaskFromContainer(id) {
	const taskItem = document.getElementById(`task-item-${id}`);
	taskItem.remove();
}
function init() {

	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.register("sw.js").then(function (registration) {
			console.log("SW registrado correctamente");
		}, function (error) {
			console.log("SW no registrado correctamente", error);
		});
	} else {
		console.log("Error");
	}

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
