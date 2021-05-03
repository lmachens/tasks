const formElement = document.querySelector(".form");

function parseJSONFromLocalStorage(key, defaultValue) {
  const json = localStorage.getItem(key);
  if (json === null) {
    return defaultValue;
  }
  const data = JSON.parse(json);
  return data;
}

function appendToArray(item, array) {
  return [...array, item];
}

function stringifyJSONToLocalStorage(key, value) {
  const json = JSON.stringify(value);

  localStorage.setItem(key, json);
}

function goToPage(href) {
  location.href = href;
}

formElement.onsubmit = function (event) {
  // Prevent the default form submit behaivor (sending data to a server an reloading page)
  event.preventDefault();

  const textInputElement = document.querySelector(".form__input");
  const checkedDateInput = document.querySelector(
    ".radio-group__input:checked"
  );

  if (!textInputElement.value) {
    alert("Text Input is empty!");
    return;
  }

  if (!checkedDateInput) {
    alert("Radio Button not checked!");
    return;
  }

  const task = {
    name: textInputElement.value,
    date: checkedDateInput.value,
    completed: false,
  };

  const taskList = parseJSONFromLocalStorage("taskList", []);
  const newTaskList = appendToArray(task, taskList);
  stringifyJSONToLocalStorage("taskList", newTaskList);

  goToPage("/dashboard.html");
};
