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

  if (form.checkValidity()) {
    let book = new Book(title.value, author.value, pages.value, read.checked);

    books.push(book);
    updateLibrary();
    toggleModal();
  }
}

function updateLibrary() {
  const bookCard = createBookCard(books.length - 1);

  library.appendChild(bookCard);
}

function createBookCard(bookIndex) {
  const book = books[bookIndex];
  const readValues = book.getReadValues();
  
  const bookCard = document.createElement('div');
  bookCard.classList.add('book');
  bookCard.dataset.bookIndex = `${bookIndex}`;

  const titleParagraph = document.createElement('p');
  titleParagraph.innerText = `${book.title}`;

  const authorParagraph = document.createElement('p');
  authorParagraph.innerText = `${book.author}`;

  const pagesParagraph = document.createElement('p');
  pagesParagraph.innerText = `${book.pages}`;

  const readStatusBtn = document.createElement('button');
  readStatusBtn.classList.add(`${readValues[0]}`);
  readStatusBtn.innerText = `${readValues[1]}`;

  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';

  bookCard.appendChild(titleParagraph);
  bookCard.appendChild(authorParagraph);
  bookCard.appendChild(pagesParagraph);
  bookCard.appendChild(readStatusBtn);
  bookCard.appendChild(removeBtn);

  return bookCard;
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

form.addEventListener('submit', (e) => e.preventDefault());

addBookBtn.addEventListener('click', () => form.reset());
addBookBtn.addEventListener('click', toggleModal);

// Hide modal by clicking outside of it
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    form.classList.remove('show');
  }
};
