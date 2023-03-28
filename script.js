const itemForm    = document.getElementById("item-form");
const itemInput   = document.getElementById("item-input");
const itemList    = document.getElementById("item-list");
const buttonClear = document.getElementById("clear");
const itemFilter  = document.getElementById("filter");
const formButton  = itemForm.querySelector("button");
let   isEditMode  = false;

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

const addItemToLocalStorage = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage(item);

  // Add new item
  itemsFromStorage.push(item);

  // stringify and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromLocalStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const displayItems = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage(item);

  itemsFromStorage.forEach(item => addItemToDOM(item));

  displayFilterAndClearButton();
};

const addItemToDOM = (item) => {
  //  Create new list item
  const li = document.createElement("li");
  const itemName = document.createTextNode(item);
  li.appendChild(itemName);

  //  Create delete button inside a list item
  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)

  // Adding li
  itemList.appendChild(li);
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

//  Validation
  const alertInfo = "Please add an item name";
  const newItem = itemInput.value;

  if (newItem === "") {
    alert(alertInfo);
    return;
  }

  // check if editing
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
    itemFilter.removeAttribute("disabled");
  } else {
    if (checkForDuplicates(newItem)) {
      alert("That item already exists");
      return;
    }
  }

  addItemToDOM(newItem);

  addItemToLocalStorage(newItem);

  displayFilterAndClearButton();

  itemInput.value = "";
}

const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // Remove from DOM
    item.remove();

    // Remove from local storage
    removeItemFromLocalStorage(item.textContent)

    displayFilterAndClearButton();
    displayClearAllButton();
  }
}

const removeItemFromLocalStorage = (item) => {
  let itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage = itemsFromStorage.filter(i => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage))
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target);
  }
};

const checkForDuplicates = (item) => {
  const itemsFromStorage = getItemsFromLocalStorage();

  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;
  itemFilter.setAttribute("disabled", "disabled");

  itemList
      .querySelectorAll("li")
      .forEach(i => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formButton.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  formButton.classList.add("edit-mode")
  itemInput.value = item.textContent;
  displayClearAllButton();
};

const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }

  // clear from local storage
  localStorage.removeItem("items")

  displayFilterAndClearButton();
}

const displayFilterAndClearButton = () => {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    buttonClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    buttonClear.style.display = "block";
    itemFilter.style.display = "block";
  }

  formButton.innerHTML = "<i class=\"fa-solid fa-plus\"></i> Add Item";
  formButton.classList.remove("edit-mode");
  formButton.classList.add("btn");

  displayClearAllButton();
};

const displayClearAllButton = () => {

  if (itemFilter.value) {
    buttonClear.style.display = "none";
  } else {
    buttonClear.style.display = "block";
  }
};

const filterItems = (e) => {
  const text  = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // Show/hide filtered item list
    if (itemName.indexOf(text) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }

    displayClearAllButton();
  })
};
const initialise = () => {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  buttonClear.addEventListener("click", clearAllItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  itemFilter.value = "";

displayFilterAndClearButton();
};

initialise();
