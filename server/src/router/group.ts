import express from "express";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.send("Hello Group!");
});

router.get("/info", (req: any, res: any) => {
  res.send("Group Info!");
});


export default router;