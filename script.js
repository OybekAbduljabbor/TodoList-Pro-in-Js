const todoForm = document.querySelector("#todo-form");
const inputValue = document.querySelector("#inputValue");
const todoAdd = document.querySelector("#todo-add");
const AddBtn = document.querySelector("#AddBtn");
const updataBtn = document.querySelector("#updataBtn");
const todoItemCard = document.querySelector("#todo-item-card");
const lengthItem = document.querySelector("#length-item");
const selectTodoBg = document.querySelector("#select-todo-bg");
const selectItem = document.querySelector("#select-item");
const TodoBottomBar = document.querySelector("#todo-bottom-bar");

let LocalData = JSON.parse(localStorage.getItem("todoList")) || [];

todoItemCard.innerHTML = TododItem(LocalData).join("");
let TodoItemId = null;

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputValue.value === "") throw alert("please enter your todo");

  if (todoAdd.value === "add") {
    LocalData.unshift({
      id: new Date().getTime(),
      text: inputValue.value,
      isChecked: false,
    });
    localStorage.setItem("todoList", JSON.stringify(LocalData));
  } else {
    LocalData.map((item, index) => {
      if (item.id === TodoItemId) {
        LocalData.splice(index, 1, { ...item, text: inputValue.value });
        localStorage.setItem("todoList", JSON.stringify(LocalData));
        todoAdd.value = "add";
        updataBtn.style.display = "none";
        AddBtn.style.display = "block";
      }
    });
  }

  todoItemCard.innerHTML = TododItem(LocalData).join("");
  inputValue.value = "";
});

function DeleteItem(id) {
  LocalData.map((item, index) => {
    if (item.id === id) {
      LocalData.splice(index, 1);
    }
  });

  if (LocalData.length === 0) {
    updataBtn.style.display = "none";
    AddBtn.style.display = "block";
    inputValue.value = "";
    todoAdd.value = "add";
    selectItem.innerHTML = 0;
    lengthItem.innerHTML = 0;
  }
  localStorage.setItem("todoList", JSON.stringify(LocalData));
  todoItemCard.innerHTML = TododItem(LocalData).join("");
  selectTodoBg.style.width = `${LocalData.length * 3}%` || "0%";
}

function EditeItem(id, name) {
  inputValue.value = name;
  todoAdd.value = "update";
  updataBtn.style.display = "block";
  AddBtn.style.display = "none";
  TodoItemId = id;
}

function OnChecked(id, isChecked) {
  LocalData.map((item, index) => {
    if (item.id === id) {
      LocalData.splice(index, 1, { ...item, isChecked: !isChecked });
      localStorage.setItem("todoList", JSON.stringify(LocalData));
      todoItemCard.innerHTML = TododItem(LocalData).join("");
    }
  });
}

function RemoveChecked() {
  const newData = [];

  LocalData.map((item, index) => {
    if (!item.isChecked) {
      newData.push(item);
    }
  });

  localStorage.setItem("todoList", JSON.stringify(newData));
  todoItemCard.innerHTML = TododItem(newData).join("");
  LocalData = newData;
  selectItem.innerHTML = 0;

  if (LocalData.length === 0) {
    lengthItem.innerHTML = 0;
    selectTodoBg.style.width = "0%";
  }
}

function TododItem(param) {
  lengthItem.innerHTML = LocalData.length || 0;
  let isCheket = 0;
  let code = true;
  return param.map((item, index) => {
    if (item.isChecked) {
      isCheket++;
    }

    lengthItem.innerHTML = param.length;
    selectTodoBg.style.width = `${param.length * 3}%` || "0%";
    selectItem.innerHTML = isCheket;

    return `
        <div id="todo-item">
          <div>
            <button id="cheked-btn" onclick="OnChecked(${item.id}, ${
      item.isChecked
    })">
            ${item.isChecked ? "<span id='on_checked'></span>" : ""}
            </button>
            <span style="${
              item.isChecked ? "text-decoration: line-through" : ""
            }" >${item.text}</span>
          </div>
          <div>
            <button onclick="EditeItem(${item.id}, '${item.text}')">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.39999 14.1L7.69999 15.4L14.6 8.50001L13.3 7.20001L6.39999 14.1ZM12.7 6.60001L11.4 5.30001L4.49999 12.2L5.89999 13.6L12.7 6.60001ZM14.8 1.90001L18.1 5.20001C18.7 5.80001 18.6 6.70001 18.1 7.20001L8.19999 17.1L1.29999 18.5L2.69999 11.6C8.89999 5.30001 12.2 2.00001 12.6 1.70001C13.2 1.30001 14.2 1.30001 14.8 1.90001Z"
                  fill="#59A3C8"
                />
              </svg>
            </button>
            <button onclick="DeleteItem(${item.id})">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.12 10L15.65 13.53L13.53 15.65L10 12.12L6.46003 15.66L4.34003 13.54L7.88003 10L4.34003 6.46003L6.46003 4.34003L10 7.88003L13.54 4.35003L15.66 6.47003L12.12 10Z"
                  fill="#59A3C8"
                />
              </svg>
            </button>
          </div>
        </div>
        `;
  });
}
