const library = document.querySelector('.book-wrapper');
console.log(library);

let books = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.getReadValues = function () {
  return this.read ? ['read', 'Read'] : ['not-read', 'Not read'];
};

function addBook() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('read');

  if (
    title.checkValidity() &&
    author.checkValidity() &&
    pages.checkValidity() &&
    read.checkValidity()
  ) {
    let book = new Book(title.value, author.value, pages.value, read.checked);

    books.push(book);
    updateLibrary();
  }
}

function updateLibrary() {
  clearLibrary();

  books.forEach((book) => {
    const readValues = book.getReadValues();
    const bookCard = `
      <div class="book">
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>

        <button class="${readValues[0]}">${readValues[1]}</button>
        <button>Remove</button>
      </div>`;
    library.innerHTML += bookCard;
  });
}

function clearLibrary() {
  let child = library.lastElementChild;
  while (child) {
    library.removeChild(child);
    child = library.lastElementChild;
  }
}

document.getElementById('submit').addEventListener('click', addBook);
