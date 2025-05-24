import styles from "../styles/BookCard.module.css";

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Year:</strong> {book.year}
      </p>
      <p>
        <strong>Status:</strong> {book.status}
      </p>

      <div className={styles.actions}>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </div>
  );
}
