//----------------------Envio de email----------------------------------
const form = useRef();

const sendEmail = (values) => {
  const serviceID = "service_phq6wkb";
  const templateID = "template_d3bst5s";
  const publicID = "A88VMvhYNS70XCfHm";

  const templateParams = {
    from_name: values.name,
    to_email: values.email,
    subject: "Inmuebles360 :)",
    message: "Bienvenido a nuestra plataforma!",
  };

  emailjs
    .sendForm(serviceID, templateID, templateParams, form.current, publicID)
    .then((result) => {
      alert("Sign Up success: ", result);
    })
    .catch((error) => {
      alert("Something was wrong: ", error);
    });
};
//----------------------------------------------------------------------
