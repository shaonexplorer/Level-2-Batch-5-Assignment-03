import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import BookRouter from "./app/routes/book.routes";
import BorrowRouter from "./app/routes/borrow.routes";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Welcome to the API!" });
  } catch (error) {
    next(error);
  }
});

app.use("/api/books", BookRouter);

app.use("/api/borrow", BorrowRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: "Not Found",
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    message: error.message || "Internal Server Error",
    success: false,
    error,
  });
});

export default app;
