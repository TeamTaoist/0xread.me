import { config } from "dotenv";
import express from "express";
import groupApi from "./router/group";
import proofApi from "./router/proof"
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/group", groupApi);
app.use("/proof", proofApi);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
