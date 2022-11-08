const form = document.querySelector('#form');
const data = document.querySelector('#data');

function addedBooks() {
  const bookTitle = form.title.value;
  const bookAuthor = form.author.value;

  const book = {
    title: bookTitle,
    author: bookAuthor,
  };

  return book;
}

function storeData(book) {
  let books = [];

  if (localStorage.getItem('Books')) {
    books = JSON.parse(localStorage.getItem('Books'));
  }

  books.push(book);
  localStorage.setItem('Books', JSON.stringify(books));
}

function addData() {
  storeData(addedBooks());
  form.submit();
}

function displayBooks() {
  if (localStorage.getItem('Books')) {
    const books = JSON.parse(localStorage.getItem('Books'));
    books.forEach((book) => {
      const booksHtml = `
        <div id="info" class="info">
          <p class="title">${book.title}</p><br>
          <p class="author">${book.author}</p><br>
          <div><button id="remove-btn">Remove</button>
          <hr>
          </div><br>
        </div>
        
        `;
      data.innerHTML += booksHtml;
    });
  }
}

displayBooks();
form.addEventListener('submit', addData);
function deletBooks(index) {
  if (localStorage.getItem('Books')) {
    const books = JSON.parse(localStorage.getItem('Books'));
    books.splice(index, 1);
    localStorage.clear();
    localStorage.setItem('Books', JSON.stringify(books));
  }
}

data.querySelectorAll('#remove-btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    deletBooks(index);
    btn.parentElement.parentElement.remove();
  });
});
