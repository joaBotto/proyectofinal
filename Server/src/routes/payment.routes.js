const { Router } = require("express");

const paymentRouter = Router();
const {PaymentController} = require(".././controllers/payment.controller")


const paymentController = new PaymentController();
paymentRouter.post("/create_preference/:cid", paymentController.createOrder);
paymentRouter.get("/success", paymentController.successPayment);
paymentRouter.get("/failure", paymentController.failurePayment);
paymentRouter.get("/pending", paymentController.pendingPayment);
paymentRouter.post("/webhook", paymentController.webhook);

module.exports= {
    paymentRouter
}
