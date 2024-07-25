const taskInput = document.getElementById("input-task");
const taskList = document.getElementById("todo-list");
const modeToggle = document.getElementById("mode-toggle");
let editingTask = null;

// FUNCTIONS
function addTask() {
	const taskValue = taskInput.value.trim();

	if(taskValue) {
		const newTask = document.createElement("li");

		newTask.innerHTML = `
			<i class="material-icons cb">check_box_outline_blank</i>
			<p>${taskValue}</p>
			<i class="material-icons edit-task">edit</i>
			<i class="material-icons remove-task">close</i>
		`;
		taskList.appendChild(newTask);
		taskInput.value = "";
		taskInput.focus();
		saveTasks();
	} else {
		taskInput.classList.add("empty");
		setTimeout(() => {
			taskInput.classList.remove("empty");
		}, 300);
	}
}

function saveTasks() {
	const tasks = [];
	taskList.querySelectorAll("li").forEach(task => {
		tasks.push({
			text: task.querySelector("p").textContent,
			completed: task.querySelector(".cb").classList.contains("checked")
		});
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach(task => {
		const newTask = document.createElement("li");

		newTask.innerHTML = `
			<i class="material-icons cb ${task.completed ? "checked" : ""}">${task.completed ? "check_box" : "check_box_outline_blank"}</i>
			<p>${task.text}</p>
			<i class="material-icons edit-task">edit</i>
			<i class="material-icons remove-task">close</i>
		`;
		taskList.appendChild(newTask);
	})
}

function editTask(task) {
	const taskText = task.querySelector("p");
	const currentText = taskText.textContent;

	const input = document.createElement("input");
	input.type = "text";
	input.value = currentText;
	input.className = "edit-input";
	task.replaceChild(input, taskText);
	input.focus();
	input.select();

	const saveEdit = () => {
		taskText.textContent = input.value.trim();
		task.replaceChild(taskText, input);
		task.classList.remove("editing");
		editingTask = null;
		saveTasks();
	};

	input.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			saveEdit();
		}
	});

	input.addEventListener("blur", saveEdit);

	task.classList.add("editing");
	editingTask = task;
}

function toggleTheme() {
	document.body.classList.toggle("dark-mode");
	document.body.classList.toggle("light-mode");
	const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
	localStorage.setItem("theme", theme);
	modeToggle.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

// EVENTS
taskList.addEventListener("click", function(event) {
	const target = event.target;

	if (target.classList.contains("cb")) {
		if (target.classList.contains("checked")) {
			target.classList.remove("checked");
			target.textContent = "check_box_outline_blank";
		} else {
			target.classList.add("checked");
			target.textContent = "check_box";
		}
		saveTasks();
	}

	if (target.classList.contains("remove-task")) {
		target.parentElement.remove();
		saveTasks();
	}

	if (target.classList.contains("edit-task")) {
		editTask(target.parentElement);
	}
});

taskInput.addEventListener("keydown", function(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		addTask();
	}
});

modeToggle.addEventListener("click", toggleTheme);

document.addEventListener("DOMContentLoaded", () => {
	const helpIcon = document.querySelector(".material-icons.help");
	const tutorial = document.querySelector(".tutorial");

	helpIcon.addEventListener("click", () => {
		tutorial.classList.toggle("hidden");
	});
})

window.addEventListener("load", () => {
	const storedTheme = localStorage.getItem("theme") || "dark";
	document.body.classList.add(storedTheme + "-mode");
	modeToggle.textContent = storedTheme === "dark" ? "light_mode" : "dark_mode";
	taskInput.focus();
	loadTasks();
});

