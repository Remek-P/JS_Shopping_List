const itemForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon
}

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button
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

  itemList.appendChild(li);

  itemInput.value = "";
}

itemForm.addEventListener("submit", addItem);