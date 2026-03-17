import fastify from "fastify";
import { appRoutes } from "./http/routes.js";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
})

app.register(swagger, {
    openapi: {
        info: {
            title: 'Movie reservation',
            version: '1.0.0',
        }
    }
})

app.register(import('@scalar/fastify-api-reference'), {
    routePrefix: '/reference',
})

app.register(appRoutes)

app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({ message: 'Validation error', issue: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        console.log(error)
    }

    return response.status(500).send({ message: 'Internal server error.' })
})