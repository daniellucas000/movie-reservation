import { RegisterUseCase } from "../register.js";
import { PrismaMovieRepository } from "@/repositories/prisma/prisma-movie-repository.js";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaMovieRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}