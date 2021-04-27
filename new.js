const formElement = document.querySelector(".form");

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

  console.log(textInputElement.value, checkedDateInput.value);
};
