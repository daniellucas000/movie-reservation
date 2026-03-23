import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.js";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
        const AuthenticateUseCase = makeAuthenticateUseCase()

        const { user } = await AuthenticateUseCase.execute({
            email,
            password
        })

        const token = await response.jwtSign(
            {}, {
            sign: {
                sub: user.id
            }
        })

        const refreshToken = await response.jwtSign(
            {}, {
            sign: {
                sub: user.id,
                expiresIn: '7d'
            }
        })

        return response.setCookie('refreshToken', refreshToken, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        }).status(200).send({ token })

    } catch (err) {
        if(err instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: err.message })
        }
    }
}