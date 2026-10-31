# Book Store API

Built with Node.js, Express, MongoDB (Mongoose), express-validator, Multer and Nodemon.

## Setup
```bash
npm install
# make sure MongoDB is running, then edit .env if needed
npm run dev
```

## Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/authors | List authors |
| POST | /api/authors | Create author (JSON) |
| GET | /api/authors/:id | Get one author |
| PUT | /api/authors/:id | Update author (JSON) |
| DELETE | /api/authors/:id | Delete author (blocked if they have books) |
| GET | /api/books | List books. Query: search, category, minPrice, maxPrice, page, limit |
| POST | /api/books | Create book (form-data, optional `cover` file) |
| GET | /api/books/:id | Get one book |
| PUT | /api/books/:id | Update book (form-data) |
| DELETE | /api/books/:id | Delete book and its cover |

## Testing in Postman
1. `POST /api/authors` with Body > raw > JSON: `{ "name": "George Orwell", "nationality": "British" }`. Copy the returned `_id`.
2. `POST /api/books` with Body > form-data:
   - title (Text): 1984
   - author (Text): the author `_id`
   - price (Text): 12.99
   - stock (Text): 20
   - category (Text): Dystopian
   - cover (File): choose an image
3. Open `http://localhost:3000/uploads/<filename>` to view the cover.
4. Try invalid data (empty title, negative price, bad author id) to see validation errors.
