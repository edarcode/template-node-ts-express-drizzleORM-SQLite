import { Controller } from "../../../types";
import { verifyRegisterService } from "./verifyRegisterService";
import { Register } from "../register/registerSchema";

export const verifyRegisterController: Controller = async (_req, res, next) => {
  try {
    const register = res.locals?.tokenPayload as Register;
    await verifyRegisterService(register);
    res.status(201).send(page);
  } catch (error) {
    next(error);
  }
};

const page = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cuenta Creada</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #252525;
            }
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s;
            }
            a:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <a href=${process.env.CLIENT_BASE_URL}>Ir al FRONT</a>
        </body>
      </html>
    `;
