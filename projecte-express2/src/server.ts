import express, { NextFunction, Request, Response } from "express";
import { CreateUserRequest } from "./interfaces/createUserRequest.js"; // Importem la interfície
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRoutes.js";


const allowedOrigins = [
  process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
];

const app = express();
const port = 3000;

// Per poder llegir el cos de la petició en format JSON
app.use(express.json());

// Registrar rutes: Configurem Express per utilitzar /api/usuari al router userRoutes:
// tota petició que vinga a /api/usuari serà gestionada per aquest router
app.use("/api/usuaris", userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escoltant a http://localhost:${port}`);
});


app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

