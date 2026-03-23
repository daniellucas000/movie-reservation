import type { FastifyInstance } from "fastify";
import { register } from "./controllers/users/register.js";
import { authenticate } from "./controllers/users/authenticate.js";


export async function appRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/users/session', authenticate)
}