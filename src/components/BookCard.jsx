import styles from "../styles/BookCard.module.css";

export default function BookCard({ book, onEdit, onDelete }) {

  const statusClass =
    book.status === "read"
      ? styles.statusRead
      : book.status === "in progress"
      ? styles.statusInProgress
      : styles.statusPending;

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.title}>{book.title}</div>
          <div className={styles.author}>{book.author}</div>
        </div>
        <span className={styles.year}>{book.year}</span>
      </div>
      
      <div className={styles.statusRow}>
        <span className={`${styles.statusBadge} ${statusClass}`}>{book.status}</span>
      </div>
      <div className={styles.actionsRow}>
        <button className={styles.editBtn} onClick={() => onEdit(book)}>Edit</button>
        <button className={styles.deleteBtn} onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </div>
  );
}

