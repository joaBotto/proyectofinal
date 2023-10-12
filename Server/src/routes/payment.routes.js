import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const router = Router();

const paymentController = new PaymentController();
router.post("/create_preference/:cid", paymentController.createOrder);
router.get("/success", paymentController.successPayment);
router.get("/failure", paymentController.failurePayment);
router.get("/pending", paymentController.pendingPayment);
router.post("/webhook", paymentController.webhook);

export default router;
