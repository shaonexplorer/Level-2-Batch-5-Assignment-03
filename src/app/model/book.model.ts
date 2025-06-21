import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "book title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "book author is erquired"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: [true, "book genre is required"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN number is required"],
      unique: [true, "ISBN number should be unique"],
      trim: true,
    },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: [true, "number of copies is required"],
      min: [0, "number of copies should be positive and minimum 01"],
    },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

bookSchema.method("setUnavailable", function () {
  this.available = false;
  return this.save();
});

bookSchema.post("findOneAndDelete", async function (doc, next) {
  const id = doc._id;
  await Borrow.deleteMany({ book: id });
  next();
});

bookSchema.post("findOneAndUpdate", async function (doc, next) {
  if (doc.copies > 0) {
    doc.available = true;
    await doc.save();
  }
  next();
});

export const Book = model<IBook>("Book", bookSchema);
