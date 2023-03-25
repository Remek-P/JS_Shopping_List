const itemForm    = document.getElementById("item-form");
const itemInput   = document.getElementById("item-input");
const itemList    = document.getElementById("item-list");
const buttonClear = document.getElementById("clear");
const itemFilter  = document.getElementById("filter");

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

const addItem = (e) => {
  e.preventDefault();

//  Validation
  const alertInfo = "Please add an item name";
  const newItem = itemInput.value;

  if (newItem === "") {
    alert(alertInfo);
    return;
  }

//  Create new list item
  const li = document.createElement("li");
  const itemName = document.createTextNode(newItem);
  li.appendChild(itemName);

  //  Create delete button inside a list item
  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)

  // Adding li
  itemList.appendChild(li);

  changeUIWhenNoLi();

  itemInput.value = "";
}

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?"))
    e.target.parentElement.parentElement.remove();

    changeUIWhenNoLi();
  }
}

const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  changeUIWhenNoLi();
}

const changeUIWhenNoLi = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    buttonClear.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    buttonClear.style.display = "block";
    itemFilter.style.display = "block";
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
    // Show/hide clear all button
    if (text) {
      buttonClear.style.display = "none";
    } else {
      buttonClear.style.display = "block";
    }
  })
};

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
buttonClear.addEventListener("click", clearAllItems);
itemFilter.addEventListener("input", filterItems)

changeUIWhenNoLi();