import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { getBooks, addBook } from "../services/bookService";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookToEdit, setBookToEdit] = useState(null);

  useEffect(() => {
    getBooks()
      .then(data => setBooks(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddOrEdit = (bookData) => {
    if (!bookToEdit) {
      addBook(bookData).then((newBook) =>
        setBooks(prev => [...prev, newBook])
      );
    }
  };

  const handleEdit = (book) => {
    setBookToEdit(book);
  };

  const handleCancelEdit = () => {
    setBookToEdit(null);
  };

  const handleDelete = (id) => {
    console.log("Delete book with ID:", id);
  };

  return (
    <div>
      <h1>📚 Book List</h1>
      <BookForm
        onSubmit={handleAddOrEdit}
        bookToEdit={bookToEdit}
        cancelEdit={handleCancelEdit}
      />
      {loading ? (
        <p>Loading books...</p>
      ) : books.length ? (
        books.map(book => (
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
