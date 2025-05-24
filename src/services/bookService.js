const API_URL = import.meta.env.VITE_API_URL + "/books";

export const getBooks = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error loading books");
  return res.json();
};

export const addBook = async (book) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error("Error adding book");
  return res.json();
};
