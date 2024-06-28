let tbody = document.querySelector("tbody");
let btnAddBook = document.querySelector("#btn-addbook");
let btnCancel = document.querySelector("#btn-cancel");
let bookTitle = document.querySelector("input[name='title']");
let bookAuthor = document.querySelector("input[name='author']");
let bookPage = document.querySelector("input[name='pagenumber']");
let bookRead = document.querySelector("input[type='checkbox']");
let errmessage = document.querySelector(".err-message");
let openModal = document.querySelector("#new-book");
let modal = document.querySelector("#dialog");
let tr = document.querySelectorAll("table tbody tr");

const myLibrairy = [];

let livre01 = new Book("1", "Vie avec conscience", "erickay", "100", "Yet");

myLibrairy.push(livre01);

function openCheck(modal) {
  if (modal.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}

//Show Modal
openModal.addEventListener("click", function () {
  modal.showModal();
  openCheck(modal);
  resetForm();
  errmessage.innerText = "";
});

//Close Modal
btnCancel.addEventListener("click", function () {
  modal.close();
  resetForm();
  errmessage.innerText = "";
});

// console.log(bookRead);

let tabSize = myLibrairy.length;

btnAddBook.addEventListener("click", function (e) {
  if (
    bookTitle.value !== "" &&
    bookAuthor.value !== "" &&
    bookPage.value !== ""
  ) {
    let readBook =
      bookRead.checked === true
        ? `${(bookRead.value = "Yet")}`
        : `${(bookRead.value = "Not Yet")}`;

    let newBook = new Book(
      myLibrairy.length + 1,
      `${bookTitle.value}`,
      `${bookAuthor.value}`,
      `${bookPage.value}`,
      `${readBook}`
    );
    myLibrairy.push(newBook);

    errmessage.className = "successmessage";
    errmessage.innerText = "Your book is add";

    resetForm();
  } else {
    if (bookTitle.value === "") bookTitle.style.border = "1px solid red";
    if (bookAuthor.value === "") bookAuthor.style.border = "1px solid red";
    if (bookPage.value === "") bookPage.style.border = "1px solid red";
    errmessage.className = "errmessage";
    errmessage.innerText = "S'il vous plait remplissez les champs vide";
  }

  tbody.replaceChildren();
  addBookToTable();
});

function Book(id, title, author, page, read) {
  //The constructor
  this.id = id;
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(
    `The ${this.title} by ${this.author}, ${this.page} pages, not read ${this.read}`
  );
};

// info.prototype = Object.create(Book);

Book.prototype.addButton = function () {
  tr.forEach(function (tr) {
    let button = document.createElement("button");
    button.innerText = "buy";
    button.className = "btn_buy";

    let td = document.createElement("td");
    td.appendChild(button);

    tr.appendChild(td);
  });
};
livre01.info();
livre01.addButton();
//Reset form
function resetForm() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPage.value = "";
  bookRead.checked = false;
  // errmessage.innerText = "";
}

// console.log(myLibrairy.length);
function addBookToTable() {
  for (let i = 0; i < myLibrairy.length; i++) {
    //Create Row
    let row = document.createElement("tr");
    //Browse the object table
    for (const [key, value] of Object.entries(myLibrairy[i])) {
      //Create Cell
      let cell = document.createElement("td");
      let cellText = document.createTextNode(`${value}`);
      // console.log(`${key}: ${value}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }
}

addBookToTable();
