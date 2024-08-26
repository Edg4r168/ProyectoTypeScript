import { Router } from "express";
import studentController from "../controllers/student";

const router = Router();

router.get("/getAll", studentController.getAll);
router.get("/get/:id", studentController.getById);
router.delete("/delete/:id", studentController.delete);
router.post("/save", studentController.save);
router.put("/update", studentController.update);

export default router;
