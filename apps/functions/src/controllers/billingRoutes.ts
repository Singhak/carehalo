
import { Router } from "express";
import {
  createBilling,
  getBillingRecord,
  getBillingRecords,
  updateBillingRecord,
  deleteBillingRecord,
} from "./billingController";

const router = Router();

router.post("/", createBilling);
router.get("/:id", getBillingRecord);
router.get("/", getBillingRecords);
router.put("/:id", updateBillingRecord);
router.delete("/:id", deleteBillingRecord);

export const billingRouter = router;
