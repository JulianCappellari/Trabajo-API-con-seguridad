try {
  const express = require("express");
  const { auth } = require("express-oauth2-jwt-bearer");

  const errorHandler = require("./middleware/errorHandler.js");
  const libroRouter = require("./routes/libros.js");


  //Todo esto es generado y configurado por auth0
  const autenticacion = auth({
    audience: "http://localhost:3001/api/biblioteca",
    issuerBaseURL: "https://dev-el2c0jz1rkc2vsrc.us.auth0.com/",
    tokenSigningAlg: "RS256",
  });

  const app = express();
  app.use(express.json());

  app.use("/libros", autenticacion, libroRouter);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3005;

  app.listen(PORT, () => {
    console.log(`API de productos escuchando en el puerto ${PORT}`);
  });
} catch (error) {
  console.error(error);
}
