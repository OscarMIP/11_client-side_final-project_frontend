import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "../components/BookForm";
import { describe, it, expect, vi } from "vitest";

describe("BookForm", () => {
  it("should submit with filled data", () => {
    const handleSubmit = vi.fn();

    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/Title/i), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Year/i), {
      target: { value: 2023 },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "read" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    expect(handleSubmit).toHaveBeenCalledOnce();
    expect(handleSubmit).toHaveBeenCalledWith({
      title: "Test Book",
      author: "Test Author",
      year: 2023,
      status: "read",
    });
  });
});
