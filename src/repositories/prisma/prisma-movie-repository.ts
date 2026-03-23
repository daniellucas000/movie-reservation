import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma.js";
import type { MoviesRepository } from "../movies-repository.js";

export class PrismaMovieRepository implements MoviesRepository {
    async create(data: Prisma.MovieCreateInput) {
        const movie = await prisma.movie.create({
            data
        })

        return movie
    }
}