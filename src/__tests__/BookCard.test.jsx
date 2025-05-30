import { render, screen, fireEvent } from "@testing-library/react";
import BookCard from "../components/BookCard";
import { describe, it, expect, vi } from "vitest";

describe("BookCard", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    year: 2023,
    status: "pending",
  };

  it("calls onEdit and onDelete when buttons are clicked", () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <BookCard book={mockBook} onEdit={onEdit} onDelete={onDelete} />
    );

    fireEvent.click(screen.getByText(/Edit/i));
    fireEvent.click(screen.getByText(/Delete/i));

    expect(onEdit).toHaveBeenCalledWith(mockBook);
    expect(onDelete).toHaveBeenCalledWith(mockBook.id);
  });
});
