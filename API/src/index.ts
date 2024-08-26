import "dotenv/config";
import express from "express";
import cors from "cors";
const morgan = require("morgan");
import studentRoutes from "./routes/student";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
