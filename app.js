const library = document.querySelector('.book-wrapper');
const form = document.getElementById('form');
const submitBookBtn = document.getElementById('submit');
const addBookBtn = document.querySelector('main > button');
const modal = document.querySelector('.modal');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get readValues() {
    return this.read ? ['read', 'Read'] : ['not-read', 'Not read'];
  }

  toggleReadValue = () => {
    this.read = !this.read;
  };
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook = () => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    if (form.checkValidity()) {
      let book = new Book(title.value, author.value, pages.value, read.checked);

      this.books.push(book);
      const bookCard = this.createBookCard(this.books.length - 1);

      library.appendChild(bookCard);
      this.toggleModal();
    }
  };

  createBookCard = (bookIndex) => {
    const book = this.books[bookIndex];
    const readValues = book.readValues;

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
    readStatusBtn.addEventListener('click', this.toggleReadStatus);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', this.removeBook);

    bookCard.appendChild(titleParagraph);
    bookCard.appendChild(authorParagraph);
    bookCard.appendChild(pagesParagraph);
    bookCard.appendChild(readStatusBtn);
    bookCard.appendChild(removeBtn);

    return bookCard;
  };

  removeBook = (e) => {
    const removedBookCard = e.target.parentElement;
    const removedBookIndex = e.target.parentElement.dataset.bookIndex;

    this.books.splice(removedBookIndex, 1);
    removedBookCard.parentElement.removeChild(removedBookCard);

    this.updateDataBookIndex();
  };

  updateDataBookIndex = () => {
    const bookCards = library.childNodes;
    let bookIndex = 0;

    bookCards.forEach((bookCard) => {
      bookCard.dataset.bookIndex = bookIndex;
      bookIndex++;
    });
  };

  toggleModal = () => {
    if (modal.classList.contains('show')) {
      modal.classList.remove('show');
      form.classList.remove('show');
    } else {
      modal.classList.add('show');
      form.classList.add('show');
    }
  };

  toggleReadStatus = (e) => {
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
    this.books[bookIndex].toggleReadValue();
  };
}

const myLibrary = new Library();

submitBookBtn.addEventListener('click', myLibrary.addBook);

form.addEventListener('submit', (e) => e.preventDefault());

addBookBtn.addEventListener('click', () => form.reset());
addBookBtn.addEventListener('click', myLibrary.toggleModal);

// Hide modal by clicking outside of it
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    form.classList.remove('show');
  }
};

// Hide modal by pressing Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('show');
    form.classList.remove('show');
  }
});
