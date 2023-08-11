import * as express from "express";
import * as dotenv from "dotenv";
import { initializeDatabase } from "./databse";
import categoryRoute from "../src/routes/category";
dotenv.config();

const db = async () => await initializeDatabase();
db();
const app = express();
app.use(express.json());

app.use("/api/category/", categoryRoute);
app.get("/", (_, res: express.Response) => {
  return res.status(200).json({ message: "Everthing its ok" });
});

app.listen(4000, () => {
  console.log(`Server listening on http://localhost:4000`);
});
