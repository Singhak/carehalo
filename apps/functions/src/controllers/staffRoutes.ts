
import { Router } from "express";
import {
  createStaff,
  getStaffMember,
  getStaff,
  updateStaff,
  deleteStaff,
} from "./staffController";

const router = Router();

router.post("/", createStaff);
router.get("/:id", getStaffMember);
router.get("/", getStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export const staffRouter = router;
