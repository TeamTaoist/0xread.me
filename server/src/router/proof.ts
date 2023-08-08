import express, { Request, Response } from "express";
import { Default_Response, Default_Error_Response } from "../constant";
import { Identity } from "@semaphore-protocol/identity";
import { Group, BigNumberish } from "@semaphore-protocol/group";
import {
  generateProof,
  verifyProof,
  FullProof,
} from "@semaphore-protocol/proof";
import path from "path";
import { fileURLToPath } from "url";
import * as groupController from "../controller/group";
import {
  generateSuccessResponse,
  generateErrorResponse,
} from "../utils/request";
import ErrorData from "../utils/error";

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIGNAL = 31415926;
const DEPTH = 16;

const router = express.Router();

// Generate Proof
router.post("/issue", async (req: Request, res: Response) => {
  const { sign_msg, group_id } = req.body;
  // check if group is valid
  const group_data = await groupController.getGroupById(group_id);
  if (!group_data) {
    res.status(200).json(generateErrorResponse(ErrorData.GROUP_NOT_FOUND));
    return;
  }

  try {
    const identity = new Identity(sign_msg);

    // check group members
    const group = new Group(group_id, DEPTH, group_data.members || []);
   if (group.indexOf(identity.commitment) === -1) {
     group.addMember(identity.commitment);
     // update members of group in db
     const members = group.members as BigInt[];

     try {
       groupController.updateGroupMembers(group_id, members);
     } catch (error) {
       res.status(500).json(generateErrorResponse(ErrorData.DATABASE_ERROR));
       return;
     }
   }
    const fullProof = await generateProof(identity, group, group.root, SIGNAL, {
      zkeyFilePath: path.join(__dirname, "../files/semaphore.zkey"),
      wasmFilePath: path.join(__dirname, "../files/semaphore.wasm"),
    });

    console.log("fullProof:", fullProof);

    res.status(200).json(
      generateSuccessResponse({
        proof: JSON.stringify(fullProof),
      })
    );
  } catch (error) {
    res.status(500).json(ErrorData.PROOF_GENERATE_FAILED);
  }
});

// Verify Proof
router.post("/verify", async (req: Request, res: Response) => {
  const { proof } = req.body;

  let fp: FullProof;

  try {
    fp = JSON.parse(proof);
  } catch (error) {
    res.status(200).json(
      generateSuccessResponse({
        result: false,
      })
    );
    return;
  }

  try {
    const result = await verifyProof(fp, DEPTH);
    res.status(200).json(
      generateSuccessResponse({
        result,
      })
    );
  } catch (error) {
    res.status(200).json(
      generateSuccessResponse({
        result: false,
      })
    );
  }
});

export default router;
