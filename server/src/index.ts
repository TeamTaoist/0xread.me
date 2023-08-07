import { config } from "dotenv";
import express from "express";
import groupApi from "./router/group/api";
import cors from "cors";
// import { initDB } from "./utils/db_discarded";

// initDB();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

app.use("/group", groupApi);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
