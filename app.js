const library = document.querySelector('.book-wrapper');
const form = document.getElementById('form');
const submitBookBtn = document.getElementById('submit');
const addBookBtn = document.querySelector('main > button');
const modal = document.querySelector('.modal');

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

Book.prototype.toggleReadValue = function () {
  this.read ? (this.read = false) : (this.read = true);
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
    form.reset();
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

function toggleModal() {
  if (modal.classList.contains('show')) {
    modal.classList.remove('show');
    form.classList.remove('show');
  } else {
    modal.classList.add('show');
    form.classList.add('show');
  }
}

submitBookBtn.addEventListener('click', addBook);

addBookBtn.addEventListener('click', toggleModal);
submitBookBtn.addEventListener('click', toggleModal);

form.addEventListener('submit', (e) => e.preventDefault());

// Hide modal by clicking outside of it
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    form.classList.remove('show');
  }
};
