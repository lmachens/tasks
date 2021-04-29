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

const heatTeeElement = createTaskElement("Tee kochen");
const drinkTeeElement = createTaskElement("Tee trinken");

const tasksGroupElement = document.querySelector(".tasks-group");

tasksGroupElement.append(heatTeeElement, drinkTeeElement);
