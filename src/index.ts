import * as express from "express";
import * as dotenv from "dotenv";
import { initializeDatabase } from "./databse";
import categoryRoute from "../src/routes/category";
import productRoute from "../src/routes/product";
dotenv.config();

const db = async () => await initializeDatabase();
db();
const app = express();
app.use(express.json());

app.use("/api/category/v1/", categoryRoute);
app.use("/api/product/v1/", productRoute);

app.get("/", (_, res: express.Response) => {
  return res.status(200).json({ message: "Everthing its ok" });
});

app.listen(4000, () => {
  console.log(`Server listening on http://localhost:4000`);
});
