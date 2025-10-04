function displayPublishedBooks() {
    const bookGrid = document.getElementById('published-books-grid');
    const books = JSON.parse(localStorage.getItem('books')) || [];

    if (books.length === 0) {
      bookGrid.innerHTML = "<p style='color: #777;'>No books published yet.</p>";
      return;
    }

    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.style.border = "1px solid #ccc";
      bookCard.style.borderRadius = "10px";
      bookCard.style.padding = "15px";
      bookCard.style.marginBottom = "20px";
      bookCard.style.background = "#f9f9f9";

      bookCard.innerHTML = `
        <img src="${book.image_url}" alt="${book.title}" class="book-cover">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Price:</strong> ₹${book.price}</p>
   
     

        <button class="add-btn" onclick="addToCart( ${book.price}, getQuantity(this))">Add to Cart</button>
      `
      ;

      bookGrid.appendChild(bookCard);
    });
  }

  // Run on page load
  window.addEventListener('DOMContentLoaded', displayPublishedBooks);