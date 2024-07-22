const taskInput = document.getElementById("input-task");
const taskList = document.getElementById("todo-list");

function addTask() {
	const taskValue = taskInput.value.trim();

	if(taskValue) {
		const newTask = document.createElement("li");

		newTask.innerHTML = `
			<i class="material-icons cb">check_box_outline_blank</i>
			<p>${taskValue}</p>
			<i class="material-icons remove-task">close</i>
		`;
		taskList.appendChild(newTask);
		taskInput.value = '';
	} else {
		taskInput.classList.add("empty");
		setTimeout(() => {
			taskInput.classList.remove("empty");
		}, 300);
	}
}

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
	}

	if (target.classList.contains("remove-task")) {
		target.parentElement.remove();
	}
});

