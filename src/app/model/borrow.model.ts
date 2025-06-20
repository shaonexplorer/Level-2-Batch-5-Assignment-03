import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Book } from "./book.model";
import { IBook } from "../interface/book.interface";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "book _id is required "],
    },
    quantity: {
      type: Number,
      required: [true, "book quantity is required"],
      min: [1, "minimum 01 book required"],
    },
    dueDate: { type: Date, required: [true, "due date is required"] },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.post("save", async function (doc, next) {
  try {
    const bookBorrowed = (await Book.findById(doc.book)) as any;

    bookBorrowed.copies -= doc.quantity;

    await bookBorrowed.save();
    if (bookBorrowed.copies == 0) {
      bookBorrowed.setUnavailable();
    }
  } catch (error) {
    console.log(error);
  }
  next();
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);
