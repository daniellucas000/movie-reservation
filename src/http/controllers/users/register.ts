import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case.js"

export async function register(request: FastifyRequest , response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
    })

    const { name, email, password } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            password,
        })
    } catch(err) {
        return response.status(409).send({ message: err }) 
    }

    return response.status(201).send()
}
