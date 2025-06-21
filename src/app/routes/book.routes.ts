import express, { NextFunction, Request, Response } from "express";
import { Book } from "../model/book.model";
import mongoose from "mongoose";
import { error } from "console";

const BookRouter = express.Router();

// create a new book

BookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBook = await Book.create(req.body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

// get books by genre or sort by field
// and order with limit

BookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let newBook;

    const genre = req.query.filter;
    const field = req.query.sortBy as string;
    const order = req.query.sort == "asc" ? 1 : -1;
    const limit = req.query.limit;

    if (genre) {
      const booksByGenre = await Book.find({ genre })
        .sort({ [field]: order })
        .limit(Number(limit));

      if (booksByGenre.length === 0) {
        throw new Error("No books found");
      }
      newBook = booksByGenre;
    } else {
      newBook = await Book.find()
        .sort({ [field]: order })
        .limit(Number(limit));

      if (newBook.length === 0) {
        throw new Error("No books found");
      }
    }

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
});

// get book by id

BookRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const newBook = await Book.findById(bookId);

      if (!newBook) {
        throw new Error("Book not found");
      }

      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: newBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

// update book by id

BookRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const newBook = await Book.findByIdAndUpdate(bookId, req.body, {
        new: true,
      });

      if (!newBook) {
        throw new Error("Book not found");
      }

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: newBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

// delete book by id

BookRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const newBook = await Book.findByIdAndDelete(bookId);

      if (!newBook) {
        throw new Error("Book not found");
      }

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: newBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default BookRouter;
