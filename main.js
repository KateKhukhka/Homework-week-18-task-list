const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const clearButton = document.getElementById("clearButton");
const errorItem = document.getElementById("errorItem");
const noTasks = document.getElementById("noTasks");
const errorContainer = document.getElementById("errorContainer");

let tasks = "";

//события при нажатии кнопки добавления задач
addButton.addEventListener("click", function createTaskElement(evt) {
  evt.preventDefault();

  let hasError = false;
  errorItem.style.display = "none";

  const taskText = taskInput.value;

  //проверка на ввод текста задачи
  if (!taskText.trim()) {
    errorItem.textContent = "Задача не введена, введите задачу";
    errorContainer.append(errorItem);
    errorItem.style.display = "block";
    hasError = true;
    return;
  }

  //создание списка задач
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;
  clearButton.disabled = false;
  taskList.append(taskItem);
  noTasks.style.display = "none";
  taskInput.value = "";
  hasError = false;

  //добавление чекбоксов к задачам
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  taskItem.prepend(checkbox);

  tasks += `${taskText}=false\n`;

  //сохранение списка в localstorage
  localStorage.setItem("list", JSON.stringify(tasks));
});

// обновление статуса чекбокса

taskList.addEventListener("click", function (evt) {
  const list = JSON.parse(localStorage.getItem("list"));
  const readyList = list.split("\n");

  let check;

  if (evt.target.tagName === "LI") {
    check = evt.target;
  } else {
    check = evt.target.closest("li");
  }

  const checkbox = check.querySelector("input");
  const liValue = check.innerText;

  checkbox.addEventListener("change", function (e) {
    let tasksList = "";
    const checkboxStatus = e.target.checked;
    readyList.forEach((val) => {
      if (val) {
        const listArr = val.split("=");
        if (listArr[0] === liValue) {
          listArr[1] = checkboxStatus;
        }

        tasksList += `${listArr[0]}=${listArr[1]}\n`;
      }
    });

    localStorage.setItem("list", JSON.stringify(tasksList));
  });
});

//события после обновления страницы
document.addEventListener("DOMContentLoaded", function (event) {
  const list = JSON.parse(localStorage.getItem("list"));
  if (list) {
    const readyList = list.split("\n");

    readyList.forEach((el) => {
      if (el) {
        const readyEl = el.split("=");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = JSON.parse(readyEl[1]);
        const liItem = document.createElement("li");
        liItem.textContent = readyEl[0];
        liItem.prepend(checkbox);
        taskList.append(liItem);
      }
    });
  }

  if (taskList != null && taskList.innerText != "") {
    clearButton.disabled = false;
    noTasks.style.display = "none";
  } else {
    clearButton.disabled = true;
  }
});

//события при нажатии кнопки очистки списка задач
clearButton.addEventListener("click", function clearTaskList(evt) {
  evt.preventDefault();
  taskList.textContent = "";
  localStorage.removeItem("list");
  clearButton.disabled = true;
  noTasks.style.display = "block";
});
