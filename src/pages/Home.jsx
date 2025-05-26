import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../services/bookService";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getBooks()
      .then((data) => setBooks(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddOrEdit = async (bookData) => {
    try {
      if (!bookToEdit) {
        const newBook = await addBook(bookData);
        setBooks((prev) => [...prev, newBook]);
      } else {
        const updated = await updateBook(bookData);
        setBooks((prev) =>
          prev.map((book) => (book.id === updated.id ? updated : book)),
        );
        setBookToEdit(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (book) => {
    setBookToEdit(book);
  };

  const handleCancelEdit = () => {
    setBookToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="mainTitle">My Book Collection📚</h1>
      {!showForm && !bookToEdit && (
        <button className="add-book-btn" onClick={() => setShowForm(true)}>
          Add Book
        </button>
      )}
      {(showForm || bookToEdit) && (
        <BookForm
          onSubmit={(data) => {
            handleAddOrEdit(data);
            setShowForm(false);
          }}
          bookToEdit={bookToEdit}
          cancelEdit={() => {
            handleCancelEdit();
            setShowForm(false);
          }}
        />
      )}
      {loading ? (
        <p>Loading books...</p>
      ) : books.length ? (
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}
