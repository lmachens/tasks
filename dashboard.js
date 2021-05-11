function createTaskElement(task) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  const span = document.createElement("span");

  input.type = "checkbox";
  input.className = "tasks-group__input";
  input.checked = task.completed;
  input.onchange = function () {
    completeTask(task.name, input.checked);
  };

  span.className = "tasks-group__task";
  span.innerText = task.name;

  label.append(input, span);
  return label;
}

function completeTask(taskName, completed) {
  const taskList = parseJSONFromLocalStorage("taskList", []);
  const task = taskList.find(function (task) {
    return task.name === taskName;
  });
  task.completed = completed;
  stringifyJSONToLocalStorage("taskList", taskList);
}

function parseJSONFromLocalStorage(key, defaultValue) {
  const json = localStorage.getItem(key);
  if (json === null) {
    return defaultValue;
  }
  const data = JSON.parse(json);
  return data;
}

function stringifyJSONToLocalStorage(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
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
    return createTaskElement(task);
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
