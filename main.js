const myLibrary = [];

let gridContainer = document.getElementById("library-display");
gridContainer.style.display = "grid";
gridContainer.style.gridTemplateColumns = "auto auto auto auto";
gridContainer.style.gap = "12px";

function validateForm() {
  let title = document.forms["form"]["ftitle"];
  let author = document.forms["form"]["fauthor"];
  let pages = document.forms["form"]["fpages"];

  if (title.value.trim() === "") {
    alert("Please enter a title.");
    title.focus();
    return false;
  }

  if (author.value.trim() === "") {
    alert("Please enter an author name.");
    author.focus();
    return false;
  }

  if (pages.value.trim() === "") {
    alert("Please enter the number of pages.");
    pages.focus();
    return false;
  }

  return true; // Form is valid
}

function Book(title, author, pages, isRead = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  console.log("Adding book to library...");
  //form
  //mentions display function

  let form = document.getElementById("form");
  let modal = document.getElementById("myModal");

  let btn = document.getElementById("add");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  let check = document.getElementById("labelCheckbox");
  let checkbox = document.getElementById("inputCheckbox");
  checkbox.addEventListener("click", function () {
    if (check.textContent == "Not Read") {
      check.textContent = "Read";
    } else {
      check.textContent = "Not Read";
    }
  });

  let bookTitle = document.getElementById("inputTitle");
  let bookAuthor = document.getElementById("inputAuthor");
  let bookPages = document.getElementById("inputPages");
  let addButton = document.getElementById("btn");

  addButton.addEventListener("click", function () {
    event.preventDefault();
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const isRead = check.textContent;

    if (!validateForm()) {
      return;
    }

    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);

    displayBook();
  });
}

function displayBook() {
  gridContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    display(book);
  });
}

function display(book) {
  let card = document.createElement("div");
  let title = document.createElement("p");
  title.textContent = book.title;
  title.style.fontSize = "24px";
  title.style.fontWeight = "bold";

  let author = document.createElement("p");
  author.textContent = book.author;
  author.style.fontSize = "18px";
  author.style.fontWeight = "medium";

  let pages = document.createElement("p");
  pages.textContent = book.pages + " pages";
  pages.style.fontSize = "18px";

  let status = document.createElement("p");
  status.textContent = book.isRead;
  status.style.fontSize = "18px";

  let remove = document.createElement("span");
  remove.classList.add("material-symbols-outlined");
  remove.textContent = "delete";

  let cardContainer = document.createElement("div");
  cardContainer.appendChild(title);
  cardContainer.appendChild(author);
  cardContainer.appendChild(pages);
  cardContainer.appendChild(status);
  cardContainer.appendChild(remove);

  card.appendChild(cardContainer);

  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.gap = "12px";

  remove.addEventListener("click", function () {
    card.remove();
  });

  card.style.backgroundColor = "#adaea1";
  card.style.borderRadius = "12px";
  card.style.padding = "12px";

  gridContainer.appendChild(card);
}
