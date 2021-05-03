function createTaskElement(taskName) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");

  input.type = "checkbox";
  input.className = "tasks-group__input";

  span.className = "tasks-group__task";
  span.innerText = taskName;

  label.append(input, span);
  return label;
}

function parseJSONFromLocalStorage(key, defaultValue) {
  const json = localStorage.getItem(key);
  if (json === null) {
    return defaultValue;
  }
  const data = JSON.parse(json);
  return data;
}

const radioGroupInputList = document.querySelectorAll(".radio-group__input");

radioGroupInputList.forEach(function (radioGroupInput) {
  radioGroupInput.onchange = function () {
    displayTaskList(radioGroupInput.value);
  };
});

displayTaskList("today");

function displayTaskList(date) {
  // Get Array with task Objects from localStorage
  const taskList = parseJSONFromLocalStorage("taskList", []);

  // Filter array by date
  const filteredTaskList = taskList.filter(function (task) {
    return task.date === date;
  });

  // Create taskElements array consisting of html elemtns base on the amount of objects
  const taskElements = filteredTaskList.map(function (task) {
    return createTaskElement(task.name);
  });

  // Get parent element of tasks
  const tasksGroupElement = document.querySelector(".tasks-group");

  removeAllChildren(tasksGroupElement);

  // Append all elements in taskElement to task group
  tasksGroupElement.append(...taskElements);
}

function removeAllChildren(tasksGroupElement) {
  tasksGroupElement.innerHTML = "";
}
