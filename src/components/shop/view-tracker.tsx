"use client";

import { useEffect } from "react";

interface Book {
  _id: string;
  title: string;
  cover_image: string;
  author: { name: string };
  category: { name: string };
  details: { price: string };
  tags: { name: string; url: string }[];
}

interface ViewTrackerProps {
  book: Book;
}

const ViewTracker = ({ book }: ViewTrackerProps) => {
  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("viewedBooks") || "[]");
    const bookData = {
      _id: book._id,
      title: book.title,
      cover_image: book.cover_image,
      author: book.author,
      category: book.category,
      details: book.details,
      tags: book.tags,
    };
    const filtered = viewed.filter((b: Book) => b._id !== book._id);
    filtered.unshift(bookData);
    localStorage.setItem("viewedBooks", JSON.stringify(filtered.slice(0, 50)));
  }, [book._id]);

  return null;
};

export default ViewTracker;
