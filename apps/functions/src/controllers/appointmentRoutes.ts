
import { Router } from "express";
import {
  createAppointment,
  getAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "./appointmentController";

const router = Router();

router.post("/", createAppointment);
router.get("/:id", getAppointment);
router.get("/", getAppointments);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export const appointmentRouter = router;
