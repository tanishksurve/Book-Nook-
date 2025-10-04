// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const BOOKS_FILE = path.join(__dirname, 'books.json');

// const app = express();

// app.use(cors());
// app.use(express.json());
// // app.use(express.static('public'));

// if (!fs.existsSync(BOOKS_FILE)) {
//   fs.writeFileSync(BOOKS_FILE, JSON.stringify([]));
// }

// const readBooks = () => {
//   try {
//     const data = fs.readFileSync(BOOKS_FILE, 'utf8');
//     return JSON.parse(data);
//   } catch (err) {
//     console.error('Error reading books:', err);
//     return [];
//   }
// };

// const writeBooks = (books) => {
//   try {
//     fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
//     return true;
//   } catch (err) {
//     console.error('Error writing books:', err);
//     return false;
//   }
// };

// app.get('/api/books', (req, res) => {
//   res.json(readBooks());
// });

// app.post('/api/books', (req, res) => {
//   const book = req.body;
//   if (!book.title || !book.author || !book.genre || !book.price) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const books = readBooks();
//   const newBook = {
//     id: Date.now(),
//     ...book,
//     rating: 0,
//     reviews: 0,
//     date_published: book.date_published || new Date().toISOString().split('T')[0]
//   };

//   books.push(newBook);
//   if (writeBooks(books)) {
//     res.json({ success: true, book: newBook });
//   } else {
//     res.status(500).json({ error: 'Failed to save book' });
//   }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });


import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BOOKS_FILE = path.join(__dirname, 'books.json');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static('public'));

if (!fs.existsSync(BOOKS_FILE)) {
  fs.writeFileSync(BOOKS_FILE, JSON.stringify([]));
}

const readBooks = () => {
  try {
    const data = fs.readFileSync(BOOKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading books:', err);
    return [];
  }
};

const writeBooks = (books) => {
  try {
    fs.writeFileSync(BOOKS_FILE, JSON.stringify(books, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing books:', err);
    return false;
  }
};

app.get('/api/books', (req, res) => {
  res.json(readBooks());
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  if (!book.title || !book.author || !book.genre || !book.price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const books = readBooks();
  const newBook = {
    id: Date.now(),
    ...book,
    rating: 0,
    reviews: 0,
    date_published: book.date_published || new Date().toISOString().split('T')[0]
  };

  books.push(newBook);
  if (writeBooks(books)) {
    res.json({ success: true, book: newBook });
  } else {
    res.status(500).json({ error: 'Failed to save book' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
