import express, { Request } from "express";
import { Default_Response, Default_Error_Response } from "../../constant";
import * as group from "./group";

const router = express.Router();

router.get("/", (req: Express.Request, res: any) => {
  res.send("Hello Group!");
});

router.put("/create", async (req: Request, res: any) => {
  try {
    // insert group
    const g = await group.insertGroup(req.body.name);
    // resp
    res.status(200).json({
      ...Default_Response,
      data: {
        id: g.id,
      },
    });
  } catch (error) {
    console.error("create group failed", error);
    res.status(500).json({
      ...Default_Error_Response,
      message: error,
    });
  }
});

router.get("/list", async (req: Express.Request, res: any) => {
  const grps = await group.getList();
  res.status(200).json({
    ...Default_Response,
    data: grps,
  });
});

export default router;
