# Book Store API

A simple backend API for a book store, built with Node.js, Express and MongoDB. You can add authors and books, upload a cover image for each book, and search through the books.

I built this to practise creating a REST API with validation and file uploads.

## Built with

- Node.js and Express
- MongoDB with Mongoose
- express-validator for checking input
- Multer for image uploads
- Nodemon for development
- Postman for testing

## How to run it

You need Node.js and MongoDB installed (or a MongoDB Atlas connection string).

```bash
git clone <your-repo-url>
cd bookstore-api
npm install
```

Create a `.env` file in the project folder:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/bookstore
```

Then start the server:

```bash
npm run dev
```

If it works, you will see "MongoDB connected" and "Server running on http://localhost:3000" in the terminal.

## Endpoints

**Authors**

- `GET /api/authors` - get all authors
- `GET /api/authors/:id` - get one author
- `POST /api/authors` - add an author
- `PUT /api/authors/:id` - update an author
- `DELETE /api/authors/:id` - delete an author (not allowed if the author still has books)

**Books**

- `GET /api/books` - get all books
- `GET /api/books/:id` - get one book
- `POST /api/books` - add a book
- `PUT /api/books/:id` - update a book
- `DELETE /api/books/:id` - delete a book

The books list also supports `search`, `category`, `minPrice`, `maxPrice`, `page` and `limit`. For example:

```
GET /api/books?search=1984&category=Dystopian&page=1&limit=5
```

## Trying it in Postman

First, add an author with `POST /api/authors` (Body > raw > JSON):

```json
{
  "name": "George Orwell",
  "nationality": "British"
}
```

Copy the `_id` from the response. Then add a book with `POST /api/books`. Use Body > form-data here, not JSON, because of the image upload:

- title: 1984
- author: the `_id` you copied
- price: 12.99
- stock: 20
- category: Dystopian
- cover: pick an image file (set the field type to File)

The image is saved in the `uploads` folder and you can open it at `http://localhost:3000/uploads/<bookstore-api>`.

## Validation

The API checks the data before saving it. For example, a book needs a title (at least 2 characters), a valid author ID and a price that is not negative. Covers must be JPEG, PNG or WEBP and under 2 MB. If something is wrong, you get a 400 response telling you which field failed.

## Project structure

```
bookstore-api/
  config/        database connection
  controllers/   the logic for each route
  middlewares/   upload, validation and error handling
  models/        Author and Book schemas
  routes/        route definitions
  validators/    validation rules
  uploads/       uploaded cover images
  server.js      starts the app
```
