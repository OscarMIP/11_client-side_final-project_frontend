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

    const newFormData = {
      title: formData.title,
      author: formData.author,
      year: formData.year,
      status: formData.status,
    };

    newFormData[name] = name === "year" ? Number(value) : value;

    setFormData(newFormData);
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
      
      <h3 className={styles.formTitle}>
        {bookToEdit ? "Edit Book" : "Add New Book"}
      </h3>

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
            placeholder="Year"
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
          {bookToEdit ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
}
