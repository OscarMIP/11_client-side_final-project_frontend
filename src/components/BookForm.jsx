import { useState, useEffect } from "react";
import styles from "../styles/BookForm.module.css";

const initialForm = {
  title: "",
  author: "",
  year: "",
  status: "pending",
};

export default function BookForm({ onSubmit, bookToEdit, cancelEdit }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (bookToEdit) {
      setFormData(bookToEdit);
    } else {
      setFormData(initialForm);
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialForm);
  };

  return (
    <div className={styles.bookFormContainer}>
      <button type="button" className={styles.cancelBtn} onClick={cancelEdit}>
        Cancel
      </button>
      <h3 className={styles.formTitle}>Add New Book</h3>
      <form onSubmit={handleSubmit} className={styles.bookFormFields}>
        <label className={styles.formLabel}>
          Title
          <input
            type="text"
            name="title"
            placeholder="Enter book title"
            value={formData.title}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </label>

        <label className={styles.formLabel}>
          Author
          <input
            type="text"
            name="author"
            placeholder="Enter author name"
            value={formData.author}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </label>

        <label className={styles.formLabel}>
          Publication Year
          <input
            type="number"
            name="year"
            placeholder="2025"
            value={formData.year}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </label>

        <label className={styles.formLabel}>
          Reading Status
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.formInput}
            required
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="read">Read</option>
          </select>
        </label>
        <button type="submit" className={styles.addBtn}>
          Add Book
        </button>
      </form>
    </div>
  );
}
