const taskList = document.getElementById("taskList");
const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const clearButton = document.getElementById("clearButton");
const errorItem = document.getElementById("errorItem");
const noTasks = document.getElementById("noTasks");
const errorContainer = document.getElementById(
  "errorContainer"
);

//события при нажатии кнопки добавления задач
addButton.addEventListener(
  "click",
  function createTaskElement(evt) {
    evt.preventDefault();

    let hasError = false;
    errorItem.style.display = "none";

    const taskText = taskInput.value;

    //проверка на ввод текста задачи
    if (!taskText.trim()) {
      errorItem.textContent =
        "Задача не введена, введите задачу";
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

    //сохранение списка в localstorage
    localStorage.setItem(
      "list",
      JSON.stringify(taskList.innerText)
    );
  }
);

//события после обновления страницы
document.addEventListener(
  "DOMContentLoaded",
  function (event) {
    taskList.innerText = JSON.parse(
      localStorage.getItem("list")
    );

    if (taskList != null && taskList.innerText != "") {
      clearButton.disabled = false;
      noTasks.style.display = "none";
    } else {
      clearButton.disabled = true;
    }
  }
);

//события при нажатии кнопки очистки списка задач
clearButton.addEventListener(
  "click",
  function clearTaskList(evt) {
    evt.preventDefault();
    taskList.textContent = "";
    localStorage.removeItem("list");
    clearButton.disabled = true;
    noTasks.style.display = "block";
  }
);
