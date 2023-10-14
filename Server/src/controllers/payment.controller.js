import mercadopago from "mercadopago";
require('dotenv').config();




export default class PaymentController {
  createOrder = async (req, res) => {
    const cartId = req.params.cid;
    const userEmail = req.session.user.email;
    mercadopago.configure({access_token:process.env.TOKEN_MP_TEST, });
    try {
      let preference = {
        items: [
          {
            title: "Mi Alquiler",
            unit_price: 200,
            quantity: 1,
            currency_id: "USD",
          }],
        back_urls: {
          success: "http://localhost:3000/api/payment/success",
          failure: "/api/payment/failure",
          pending: "/api/payment/pending",
        },
        auto_return: "approved",
      };

      await mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.json({
            id: response.body.id,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  successPayment = async (req, res) => {
    res.send(
      "Pago aprobado exitoxamente, recibira un mail con los datos de la compra "
    );
  };
  failurePayment = async (req, res) => {
    res.send(" failure payment");
  };
  pendingPayment = async (req, res) => {
    res.send(" pending payment");
  };
  webhook = async (req, res) => {
    const payment = req.query;
    try {
      if (payment.type === "payment") {
        console.log(payment);
        const data = await mercadopago.payment.findById(req.query["data.id"]);
        console.log(data);
      }
      res.status(200).json({ message: "ok" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }

    res.send("Hello webhook");
  };
}

