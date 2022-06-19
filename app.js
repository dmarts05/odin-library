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
    const bookCard = createBookCard(books.length - 1);

    library.appendChild(bookCard);
    toggleModal();
  }
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
  readStatusBtn.addEventListener('click', toggleReadStatus);

  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'Remove';
  removeBtn.addEventListener('click', removeBook);

  bookCard.appendChild(titleParagraph);
  bookCard.appendChild(authorParagraph);
  bookCard.appendChild(pagesParagraph);
  bookCard.appendChild(readStatusBtn);
  bookCard.appendChild(removeBtn);

  return bookCard;
}

function removeBook(e) {
  const removedBookCard = e.target.parentElement;
  const removedBookIndex = e.target.parentElement.dataset.bookIndex;

  books.splice(removedBookIndex, 1);
  removedBookCard.parentElement.removeChild(removedBookCard);

  updateDataBookIndex();
}

function updateDataBookIndex() {
  const bookCards = library.childNodes;
  let bookIndex = 0;

  bookCards.forEach((bookCard) => {
    bookCard.dataset.bookIndex = bookIndex;
    bookIndex++;
  });
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

function toggleReadStatus(e) {
  const readStatusBtn = e.target;

  if (readStatusBtn.classList.contains('read')) {
    readStatusBtn.classList.remove('read');
    readStatusBtn.classList.add('not-read');
    readStatusBtn.innerText = 'Not read';
  } else {
    readStatusBtn.classList.remove('not-read');
    readStatusBtn.classList.add('read');
    readStatusBtn.innerText = 'Read';
  }

  const bookIndex = readStatusBtn.parentElement.dataset.bookIndex;
  books[bookIndex].toggleReadValue();
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

// Hide modal when when by pressing Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
    form.classList.remove('show');
  }
});
