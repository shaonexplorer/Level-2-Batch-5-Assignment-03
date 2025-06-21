import express, { NextFunction, Request, Response } from "express";
import { Book } from "../model/book.model";
import { Borrow } from "../model/borrow.model";
import { title } from "process";

const BorrowRouter = express.Router();

// Route to borrow a book

BorrowRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { book, quantity } = req.body;

      const bookBorrowed = (await Book.findById(book)) as any;

      if (!bookBorrowed) {
        throw new Error("Book not found");
      }

      let borrow;

      if (bookBorrowed.copies >= quantity) {
        borrow = await Borrow.create(req.body);

        res.status(200).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrow,
        });
      } else throw new Error("Not enough copies available for borrowing");
    } catch (error) {
      next(error);
    }
  }
);

BorrowRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrow = await Borrow.aggregate([
        { $group: { _id: "$book", TotalQuantity: { $sum: "$quantity" } } },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        { $unwind: "$bookDetails" },
        {
          $project: {
            _id: 0,
            book: { title: "$bookDetails.title", ISBN: "$bookDetails.isbn" },
            TotalQuantity: "$TotalQuantity",
          },
        },
      ]);

      if (borrow.length === 0) {
        throw new Error("No borrowed books found");
      }

      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: borrow,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default BorrowRouter;
