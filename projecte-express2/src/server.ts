import express, { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "./interfaces/createUserRequest.js"; // Importem la interfície
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
const port = 3000;

// Per poder llegir el cos de la petició en format JSON
app.use(express.json());

// Registrar rutes: Configurem Express per utilitzar /api/usuari al router userRoutes:
// tota petició que vinga a /api/usuari serà gestionada per aquest router
app.use("/api/usuaris", userRouter);

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});
