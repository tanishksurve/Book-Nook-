import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const PORT = process.env.PORT || 3001;
const app = express();

// Simple CORS setup for development
app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Initialize Gemini
if (!process.env.GOOGLE_API_KEY) {
  console.error("Missing GOOGLE_API_KEY in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Sample book database
const books = [
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Thriller',
    tags: ['mystery', 'psychological', 'dark'],
    mood: 'intense',
    description: 'A psychological thriller about a woman who shoots her husband and then stops speaking.'
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Sci-Fi',
    tags: ['space', 'science', 'adventure'],
    mood: 'exciting',
    description: 'A lone astronaut must save humanity from extinction in this science-driven space adventure.'
  },
  {
    title: 'The Paris Detective',
    author: 'James Patterson',
    genre: 'Mystery',
    tags: ['detective', 'paris', 'crime'],
    mood: 'intriguing',
    description: 'A detective solves crimes in the heart of Paris.'
  },
];

// Search books function
function searchBooks(keywords = []) {
  const kw = keywords.map(k => k.toLowerCase());
  return books.filter(book =>
    kw.some(k =>
      book.title.toLowerCase().includes(k) ||
      book.author.toLowerCase().includes(k) ||
      book.genre.toLowerCase().includes(k) ||
      (book.tags && book.tags.some(tag => tag.toLowerCase().includes(k))) ||
      book.description.toLowerCase().includes(k)
    )
  );
}

// Recommendation function
function recommendBooks(genre, mood) {
  return books.filter(book => {
    let match = true;
    if (genre) match = match && book.genre.toLowerCase() === genre.toLowerCase();
    if (mood) match = match && book.mood.toLowerCase() === mood.toLowerCase();
    return match;
  });
}

// Chatbot route - modified to match your original structure
app.post('/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Please enter a message" });
    }

    console.log("Received message:", message);

    // THIS IS THE LINE THAT NEEDS TO BE CHANGED
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',  // Updated model name
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
      }
    });

    const prompt = `Respond to this book-related query: "${message}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Error in /chatbot:", error);
    res.status(500).json({
      reply: "Sorry, I'm having trouble responding right now.",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});