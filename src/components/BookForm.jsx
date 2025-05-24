import { useState, useEffect } from "react";

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
    <form onSubmit={handleSubmit}>
      <h2>{bookToEdit ? "Edit Book" : "Add Book"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="read">Read</option>
      </select>

      <button type="submit">{bookToEdit ? "Update" : "Add"}</button>

      {bookToEdit && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
